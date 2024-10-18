const { PubSub } = require('graphql-subscriptions')
const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const { v1: uuid } = require('uuid')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => await Book.find({}).countDocuments(),
      authorCount: async () => await Author.find({}).countDocuments(),
      allBooks: async(root, args) => {
          if (!args.authorId && !args.genre) {
            return await Book.find({}).populate('author');
          }
  
          if (args.authorId && args.genre) {
              return await Book.find({
                author: args.authorId, // Author ID
                genres: { $elemMatch: { $eq: args.genre } } // Filter for the genre
              }).populate('author');
  
          }
          
          if (args.authorId) {
            return await Book.find({author: args.authorId}).populate('author');
          } else {
            return await Book.find({genres: { $elemMatch: { $eq: args.genre } }}).populate('author');
          }
          
      },
      allAuthors: async () => await Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      },
    },
    Author: {
      bookCount: async (root) => await Book.countDocuments({author: root.id})
  
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if (!args.author || args.author.length < 4) {
          throw new GraphQLError('Author Name too short.', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          })
        }
        if (!args.title || args.title.length < 5) {
          throw new GraphQLError('Book title too short.', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          })
        }
          let author = await Author.findOne({name: args.author})
  
          if (!author) {
            author = new Author({ name: args.author})
            author = await author.save()
          } 
  
          const book = new Book({
            title: args.title,
            published: args.published,
            author: author,
            genres: args.genres
          })
          
          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return await book.save()
          
      },
      editBorn: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const author = await Author.findOne({name: args.name})
        if (!author) {
            return null
        }
  
        author.born = args.born
        author.save()
  
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
    }

module.exports = resolvers