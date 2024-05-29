import {useState} from "react";

const Blog = ({ blog }) => {
    const [viewFull, setViewFull] = useState(false)


  return (
      < div style={{
        border: "1px solid black",
        margin: "5px",
        padding: "5px"
      }}>
        {viewFull &&
            <div>
              <p>{blog.title}</p>
              <p>{blog.author}</p>
              <p>{blog.url}</p>
              <p>{blog.likes}</p>
              <button>Like</button>
              <button onClick={() => setViewFull(false)}>Hide</button>
            </div>
        }
        {!viewFull &&
            <div>
            <p>{blog.title}</p>
              <button onClick={() => setViewFull(true)}>View</button>
            </div>
        }
      </ div>
  )
}

export default Blog