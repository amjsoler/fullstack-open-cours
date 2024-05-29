const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogsList) => {
    return blogsList.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0)
}

const favoriteBlog = (blogsList) => {
    //Find the blog with the most likes
    return blogsList.reduce((acc, blog) => {
        return acc.likes > blog.likes ? acc : blog
    }, {likes: 0})
}

const mostBlogs = (blogsList) => {
    //Find the author with the most blogs
    const reduced = blogsList.reduce((acc, blog) => {
        if (acc[blog.author]) {
            acc[blog.author]++
        } else {
            acc[blog.author] = 1
        }
        return acc
    }, {})

    const max = Math.max(...Object.values(reduced))
    const author = Object.keys(reduced).find(key => reduced[key] === max)

    return {
        author: author,
        blogs: max
    }
}

const mostLikes = (blogsList) => {
    const reduced = blogsList.reduce((acc, blog) => {
        if(acc[blog.author]) {
            acc[blog.author] += blog.likes
        }else{
            acc[blog.author] = blog.likes
        }

        return acc
    }, [])

    const max = Math.max(...Object.values(reduced))
    const author = Object.keys(reduced).find(key => reduced[key] === max)

    return {
        author: author,
        likes: max
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}