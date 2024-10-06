import { useEffect, useState } from "react";
import "./index.css";

const backendUri = import.meta.env.VITE_BACKEND_URI;

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${backendUri}/api/all`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      title: e.target.title.value,
      content: e.target.content.value,
    });

    if (editId) {
      fetch(`${backendUri}/api/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts(posts.map((post) => (post._id === data._id ? data : post)));
        });
      setEditId(null);
    } else {
      fetch(`${backendUri}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
        }),
      })
        .then((res) => res.json())
        .then((post) => {
          setPosts([...posts, post]);
        });
    }

    setFormData({
      title: "",
      content: "",
    });
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
    });
    setEditId(post._id);
  };

  const handleDeletePost = (id) => {
    fetch(`${backendUri}/api/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setPosts(posts.filter((post) => post._id !== id)));
  };

  return (
    <>
      <h1>Blog App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
        <button type="submit">{editId ? "Update Post" : "Create Post"}</button>
      </form>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.dateCreated}</p>
          <button onClick={() => handleEditPost(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
