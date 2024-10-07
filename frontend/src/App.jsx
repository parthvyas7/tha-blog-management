import { useEffect, useState } from "react";
import "./index.css";
import DialogBox from "./DialogBox";
import Modal from "./Modal";

const backendUri = import.meta.env.VITE_BACKEND_URI;

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isOpenDialogBox, setIsOpenDialogBox] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  function timeAgo(date) {
    const units = [
      { name: "year", millis: 1000 * 60 * 60 * 24 * 365 },
      { name: "month", millis: 1000 * 60 * 60 * 24 * 30 },
      { name: "day", millis: 1000 * 60 * 60 * 24 },
      { name: "hour", millis: 1000 * 60 * 60 },
      { name: "minute", millis: 1000 * 60 },
      { name: "second", millis: 1000 },
    ];

    const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const elapsed = Date.now() - new Date(date).getTime();

    for (let unit of units) {
      if (Math.abs(elapsed) >= unit.millis || unit.name === "second") {
        return formatter.format(Math.floor(elapsed / unit.millis), unit.name);
      }
    }
  }

  function formatDateToDDMMYYYY(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${backendUri}/api/all`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPosts(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
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
    setIsOpenDialogBox(true);
  };

  const handleDeletePost = (id) => {
    fetch(`${backendUri}/api/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setPosts(posts.filter((post) => post._id !== id)));
  };

  const handleViewPost = (post) => {
    setModalOpen(true);
    setPost(post);
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <h1 className="text-4xl">Blog App</h1>
        <DialogBox
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editId={editId}
          setIsOpenDialogBox={setIsOpenDialogBox}
          isOpenDialogBox={isOpenDialogBox}
          setEditId={setEditId}
        />
      </nav>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">Error: {error.message}</p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200 max-h-screen overflow-y-auto">
          {posts.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <p className="text-xl text-gray-700">No Posts Found</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                onClick={() => handleViewPost(post)}
                className="bg-white rounded shadow p-4 hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
              >
                <h2 className="p-2 text-4xl line-clamp-1" title={post.title}>
                  {post.title}
                </h2>
                <p
                  className="p-2 text-xl text-gray-700 line-clamp-2"
                  title={post.content}
                >
                  {post.content}
                </p>
                <p
                  title={formatDateToDDMMYYYY(post.dateCreated)}
                  className="p-2 text-gray-700"
                >
                  {timeAgo(post.dateCreated)}
                </p>
                <button
                  className="m-2 p-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  onClick={() => handleEditPost(post)}
                >
                  Edit
                </button>
                <button
                  className="m-2 p-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
          <Modal
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            post={post}
          />
        </div>
      )}
    </>
  );
}

export default App;
