const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const AuthSessionToken = require('../models/authSessionToken')

blogsRouter.get('/', async (request, response) => {
    blogs = await Blog.find({}).populate('user', {
        username: 1,
        email: 1,
        id: 1
    })

    return response.json(blogs)
})

blogsRouter.post('/',  async (request, response) => {
    try {
        //Comprobamos si en la petición viene token de sesión
        let token = request.headers.authorization

        if(!token){
            return response.status(401).json({error: 'Token de sesión no encontrado'})
        }

        //Si viene, buscamos el usuario en la tabla de sesiones
        token = token.replace('Bearer ', '')

        const tokenRead = await AuthSessionToken.findOne({ token }).populate('userId', {username: 1, email: 1, id: 1, blogs: 1})

        if(!tokenRead){
            return response.status(401).json({error: 'Token de sesión inválido'})
        }

        const data = {
            ...request.body,
            user: tokenRead.userId.id
        }
        const blog = new Blog(data)

        const createdBlog = await blog.save()

        tokenRead.userId.blogs = tokenRead.userId.blogs.concat(createdBlog._id)
        tokenRead.userId.save()

        return response.status(201).json(createdBlog)
    }catch(error){
        console.log(error)
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