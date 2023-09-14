import { useMemo, useState } from "react";

import "./App.css";
import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";
import PostFilters from "./components/posts/PostFilters";

function App() {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        sort: "",
        query: "",
    });

    // * HANDLERS

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

    // * SORT & MEMO STATE

    // * Сортируем некие 2 объекта a и b, используя динамическое свойство,
    // * которое являет собой строку запроса что хранится в filters.sort
    // * через localeCompare сравниваем, с каждым значением свойства поста в массиве
    // * И всё это кешируется через useMemo

    const sortPostMemo = useMemo(() => {

        if (filters.sort) return [...posts].sort((a, b) => a[filters.sort].localeCompare(b[filters.sort]));

        return posts;
    }, [filters.sort, posts]);


    // * SORT & SEARCH HANDLER

    const sortAndSearchPostsMemo = useMemo(() => {
        // * Case insensitive search uses only post title
        const query = filters.query.toLowerCase();

        return sortPostMemo.filter((post) => post.title.toLowerCase().includes(query))
    }, [filters.query, sortPostMemo]);

    return (
        <div className="App">
            <Wrapper>
                <Counter />
                <PostForm
                    createPost={createPostHandler}
                    posts={posts}
                />
                <PostFilters
                    filters={filters}
                    setFilters={setFilters}
                />

                <PostList
                    title="Posts list"
                    removePost={removePostHandler}
                    posts={sortAndSearchPostsMemo}
                />
            </Wrapper>
        </div>
    );
}

export default App;
