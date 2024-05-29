import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleLogin}>
        <div>
            username
            <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
        </form>
    )
}

const LoggedInUser = (props) => {
    return (
        <div>
        <p>{props.user.username} logged in</p>
        <button onClick={props.handleLogout}>logout</button>
        </div>
    )

}

const CreateNewBlog = ({newTitle, newAuthor, newUrl, setTitle, setAuthor, setUrl, handlerCreateNewBlog}) => {
    return (
        <form onSubmit={handlerCreateNewBlog}>
            <div>
                <input type="text" placeholder="Title" value={newTitle} onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Author" value={newAuthor} onChange={({target}) => setAuthor(target.value)} />
            </div>
            <div>
                <input type="text" placeholder="URL" value={newUrl} onChange={({target}) => setUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

const Notificacion = ({message, type}) => {
    return (
        <>
            <div className={
                type === "error" ? "error" : "success"
            }>
                {message}
            </div>
        </>
    )

}
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

    useEffect(() => {
        if(localStorage.getItem("user")){
            const user = JSON.parse(localStorage.getItem("user"))
            setUser(user)
        }

        if(localStorage.getItem("token")){
            const token = localStorage.getItem("token")
            blogService.setToken(token)
        }
    }, [])

    useEffect(() => {
        if(user) {
            const blogs = blogService.getAll().then(blogs => {
                setBlogs(blogs)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [user])

    useEffect(() => {
        if(notification){
            setTimeout(() => {
                setNotification(null)
                setNotificationType(null)
            }, 5000)
        }
    })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.login({username: username, password: password})
      setUser(user.userId)
      setUsername('')
      setPassword('')

        localStorage.setItem("user", JSON.stringify(user.userId))
        localStorage.setItem("token", user.token)

    blogService.setToken(user.token)

    //Si conseguimos hacer login, leo los blogs del usuario
    const blogs = await blogService.getAll()
    setBlogs(blogs)

        setNotification(`Welcome ${user.userId.username}`)
        setNotificationType("success")
    } catch (exception) {
      console.log('Wrong credentials')
        setNotification("Wrong credentials")
        setNotificationType("error")
    }
  }

  const handleLogout = () => {
    setUser(null)

      localStorage.removeItem("user")
      localStorage.removeItem("token")
  }

  const handleCreateNewBlog = (event) => {
    event.preventDefault()

    blogService.createNewPost({
        title: newTitle,
        author: newAuthor,
        url: newUrl
    })

  }

  return (
    <div>
        <Notificacion message={notification} type={notificationType} />
      { !user && <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword} />}

        { user && <LoggedInUser user={user} handleLogout={handleLogout} /> }

        {
            user &&
            <>
                <h2>blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
                <CreateNewBlog handlerCreateNewBlog={handleCreateNewBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} setTitle={setNewTitle} setAuthor={setNewAuthor} setUrl={setNewUrl} />
            </>
        }

    </div>
  )
}

export default App