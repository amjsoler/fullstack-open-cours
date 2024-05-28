const supertest = require('supertest')
const {test, describe, before, after} = require("node:test")
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const {mongo} = require("mongoose");

describe('when get request to api/blogs, the response should contain all blogs contained in bd', () => {
    const initialBlogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

    before(async () => {
        await Blog.deleteMany({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogs = response.body

        assert.equal(blogs.length, 6)
    })

    test('assert that the unique identifier property of the blog posts is named id', async () => {
const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert(blog.id)
        })
    })

    test('when create a new blog, check that the blogs length is increased by one', async () => {
        const actualBlogs = await api.get('/api/blogs')
        const actualBlogsLength = actualBlogs.body.length

        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "https://newblog.com/",
            likes: 0
        }

        await api.post('/api/blogs').send(newBlog).expect(201)

        const newBlogs = await api.get('/api/blogs')
        const newBlogsLength = newBlogs.body.length

        assert.equal(newBlogsLength, actualBlogsLength + 1)
    })

    test('When create a new blog without likes property, the likes property is set to 0', async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "https://newblog.com/",
        }

        const blogCreatedResponse = await api.post('/api/blogs').send(newBlog).expect(201)

        const newBlogs = blogCreatedResponse.body

        assert.equal(newBlogs.likes,  0)
    })

    test('When create a new blog without title and url properties, the response status is 400', async () => {
        const newBlog = {
            url: "https://newblog.com/"
        }

        const blogCreatedResponse = await api.post('/api/blogs').send(newBlog).expect(400)

    })

    test('When delete a blog, the response status is 204', async () => {
        const blogsDeletedResponse = await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(204)
    })

    test('When update a blog, the response status is 200', async () => {
          const updateBlogresponse = await api.put('/api/blogs/5a422aa71b54a676234d17f8').send({likes: 10}).expect(200)

        const updatedBlog = updateBlogresponse.body

        assert.equal(updatedBlog.likes, 10)
    })

    after(() => {
        mongoose.connection.close()
    })
})