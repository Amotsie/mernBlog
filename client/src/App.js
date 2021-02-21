import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tittle, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  let getBLockPosts = () => {
    axios
      .get("/api/")
      .then((response) => {
        const data = response.data;
        setPosts(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBLockPosts();
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      tittle,
      body,
    };
    if (tittle === "" || body === "") return;
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then((data) => {
        console.log(data.data.message);
        resetState();
        getBLockPosts();
      })
      .catch((e) => console.log(e));
  };

  const resetState = () => {
    setBody("");
    setTitle("");
  };

  return (
    <div className="app">
      <h1> Welcome to React Blog Posts</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            placeholder="Tittle"
            type="text"
            name="tittle"
            value={tittle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-input">
          <textarea
            placeholder="message body"
            name="body"
            cols="30"
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">SUBMIT</button>
      </form>

      <div className="blog-post">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="post-display">
              <h3>{post.tittle}</h3>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
