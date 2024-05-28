const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    blogs = await Blog.find({})

    return response.json(blogs)
})

blogsRouter.post('/',  async (request, response) => {
    try {
        const blog = new Blog(request.body)

        const createdBlog = await blog.save()

        return response.status(201).json(createdBlog)
    }catch(error){
        return response.status(400).json(error)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)

    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })

    return response.json(updatedBlog)
})

module.exports = blogsRouter