import { useState } from "react";

import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";
import Select from "./components/ui/Select";

function App() {
    const [posts, setPosts] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");

    const TEXT_CONTENT = {
        startTitle: "Post list is empty",
        blogTitle: "Post title",
    };

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

    const sortPostsHandler = (sort) => {
        setSelectedSort(sort);
        // * Сортируем динамическое свойство "a" (переданне как arg) с "b"
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    };

    return (
        <div className="App">
            <Wrapper>
                <Counter />
                <PostForm
                    createPost={createPostHandler}
                    posts={posts}
                />
                <div>
                    <Select
                        id="select-sort"
                        value={selectedSort}
                        onChange={sortPostsHandler}
                        defaultValue="Сортировка по"

                        // * значение свойства value должно совпадать
                        // * с именем свойства объекта newPost из PostForm
                        options={[
                            {
                                label: "По заголовку",
                                value: "title",
                            },
                            {
                                label: "По контенту",
                                value: "content",
                            },
                            {
                                label: "По ID",
                                value: "id",
                            },
                        ]}
                    />
                </div>

                {posts.length ? <h3>{TEXT_CONTENT.blogTitle}</h3> : <h3>{TEXT_CONTENT.startTitle}</h3>}
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
