import { useState } from "react";

import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";

function App() {
    const [posts, setPosts] = useState([]);
    const startText = "Post list is empty";
    const blogTitle = "Post title"

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
    };

    // const filterAction = (arr, id) => arr.filter((item) => item?.id === id)

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    
    };

    return (
        <div className="App">
            <Wrapper>
                <Counter />
                <PostForm
                    createPost={createPostHandler}
                    posts={posts}
                />
                <div className="SortBlock">
                    <select name="select" id="select">
                        <option value="sort-by-title" id="sort-by-title">По названию</option>
                        <option value="sort-by-content" id="sort-by-content">По контенту</option>
                        <option value="sort-by-id" id="sort-by-id">По ID</option>
                    </select>
                </div>

                {posts.length ? <h3>{blogTitle}</h3> : <h3>{startText}</h3> } 
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
