import {useState} from "react";
import blogService from "../services/blogs.js";

const CreateNewBlog = () => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const [formVisible, setFormVisible] = useState(false)

    const handleCreateNewBlog = (event) => {
        event.preventDefault()

        blogService.createNewPost({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setFormVisible(false)
    }

    return (
        <>
        {formVisible &&
            <>
                <form onSubmit={handleCreateNewBlog}>
                    <div>
                        <input type="text" placeholder="Title" value={newTitle}
                               onChange={({target}) => setNewTitle(target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Author" value={newAuthor}
                               onChange={({target}) => setNewAuthor(target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder="URL" value={newUrl}
                               onChange={({target}) => setNewUrl(target.value)}/>
                    </div>
                    <button type="submit">Create</button>
                </form>
                <button onClick={() => setFormVisible(false)}>Cancel</button>
            </>
        }
            {!formVisible && <button onClick={() => setFormVisible(true)}>Create New Blog</button>}
        </>


    )
}

export default CreateNewBlog