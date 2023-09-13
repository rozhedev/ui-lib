import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";

function App() {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const addPostHandler = (e) => {
        e.preventDefault();

        const newPost = {
            id: uuidv4(),
            title: formData.title,
            content: formData.content,
        };
        setPosts((posts) => [...posts, newPost]);
        setFormData({
            title: "",
            content: "",
        });
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

    return (
        <div className="App">
            <Wrapper>
                <Counter />
                <PostForm
                    addPost={addPostHandler}
                    setFormData={setFormData}
                    formData={formData}
                />
                <PostList
                    title="Posts list"
                    removePost={removePostHandler}
                    posts={posts}
                />
            </Wrapper>
        </div>
    );
}

export default App;
