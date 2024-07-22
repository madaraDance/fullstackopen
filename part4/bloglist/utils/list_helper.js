const dummy = blogs => 1

const mostLikesPerBlog = blogs => {
    if (blogs.length === 0 || !blogs) {
        return 0;
    }

    return blogs.reduce((sum, blog) => sum + blog.likes, 0)

}

const favoriteBlog = blogs => blogs.reduce((maxBlog, blog) => 
    blog.likes > maxBlog.likes
        ? blog 
        : maxBlog, blogs[0])

const mostBlogs = blogs => {
    const authorBlogCounts = blogs.reduce((authorCount, blog) => {
        authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
      return authorCount;
    }, {});

    const maxAuthor = Object.keys(authorBlogCounts).reduce((max, author) => {
      return authorBlogCounts[author] > authorBlogCounts[max] ? author : max;
    });

    return {
      author: maxAuthor,
      blogs: authorBlogCounts[maxAuthor]
    };
}; 

const totalMostLikes = blogs => {
    const authorLikesCounts = blogs.reduce((authorCount, blog) => {
        authorCount[blog.author] = (authorCount[blog.author] || 0) + blog.likes;
      return authorCount;
    }, {});

    const maxAuthor = Object.keys(authorLikesCounts).reduce((max, author) => {
      return authorLikesCounts[author] > authorLikesCounts[max] ? author : max;
    });

    return {
      author: maxAuthor,
      likes: authorLikesCounts[maxAuthor]
    };
}; 



module.exports = {
    dummy,
    mostLikesPerBlog,
    favoriteBlog,
    mostBlogs,
    totalMostLikes
}