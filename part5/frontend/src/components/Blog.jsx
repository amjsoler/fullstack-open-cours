import {useState} from "react";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {

    Blog.propTypes = {
        blog: PropTypes.shape({
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired
        })

    }
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