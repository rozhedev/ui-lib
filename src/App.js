import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayAnim } from "./data/anim-config";

import "./App.css";
import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";
import PostFilters from "./components/posts/PostFilters";
import Modal from "./components/ui/Modal";
import Btn from "./components/ui/Btn";

function App() {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        sort: "",
        query: "",
    });
    // * Modal state
    const [visible, setVisible] = useState(false);

    // * HANDLERS

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

    // * SORT & MEMO STATE

    // * Сортируем некие 2 объекта a и b (из массива posts), используя динамическое свойство,
    // * которое являет собой строку запроса что хранится в filters.sort
    // * через localeCompare сравниваем, с каждым значением свойства поста в массиве
    // * И всё это кешируется через useMemo

    const sortPostMemo = useMemo(() => {
        if (filters.sort) return [...posts].sort((a, b) => a[filters.sort].localeCompare(b[filters.sort]));

        return posts;
    }, [filters.sort, posts]);

    // * SORT & SEARCH HANDLER

    const sortAndSearchPostsMemo = useMemo(() => {
        // * Case insensitive search uses only post title prop
        const query = filters.query.toLowerCase();

        return sortPostMemo.filter((post) => post.title.toLowerCase().includes(query));
    }, [filters.query, sortPostMemo]);

    // * ANIM

    return (
        <div className="App">
            <Wrapper>
                <Counter />
                <AnimatePresence>
                    <Btn onClick={(e) => setVisible(true)}>Show form</Btn>
                    {visible && (
                        <motion.div
                            style={{ marginTop: "0px" }}
                            key="modal"
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            variants={modalOverlayAnim}
                        >
                            <Modal
                                visible={visible}
                                setVisible={setVisible}
                            >
                                <PostForm
                                    createPost={createPostHandler}
                                    posts={posts}
                                />
                            </Modal>
                        </motion.div>
                    )}
                </AnimatePresence>

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
