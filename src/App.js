import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { usePosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";

import { modalOverlayAnim } from "./data/anim-config";
import { API_LINKS } from "./data/api-keys";
import { getPagesCount } from "./utils/getPages";

import "./App.css";
import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";
import PostFilters from "./components/posts/PostFilters";
import Modal from "./components/ui/Modal";
import Btn from "./components/ui/Btn";
import PostService from "./API/PostService";
import Loader from "./components/ui/Loader";

function App() {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        sort: "",
        query: "",
    });
    const sortAndSearchPosts = usePosts(posts, filters.sort, filters.query);
    // * States for pagination
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [postsLimit, setPostsLimit] = useState(10);
    const [postPage, setPostPage] = useState(1);

    // * Modal state
    const [visible, setVisible] = useState(false);

    //*  Load & error handling, uses custom hook
    const [fetchPosts, isPostsLoad, loadErr] = useFetching(async () => {
        const res = await PostService.getAll(API_LINKS.getPosts, postsLimit, postPage);
        const json = await res.json();

        // * Convert id to string for correct sort working & remove userId prop
        const posts = json.map((post) => ({
            ...post,
            id: uuidv4(),
        }));

        setPosts(posts);
        const totalCount = res.headers.get("X-Total-Count");
        setTotalPagesCount(getPagesCount(totalCount, postsLimit));
    });

    useEffect(() => {
        fetchPosts();
    }, [postPage]);

    // TODO Create custom hook usePagination
    let pagesArr = [];
    for (let i = 0; i < totalPagesCount; i++) {
        pagesArr.push(i + 1);
    }

    // * HANDLERS

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

    const changePage = (page) => setPostPage(page);

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

                {loadErr && <h3>Произошла ошибка: {loadErr}</h3>}

                {isPostsLoad ? (
                    <Loader />
                ) : (
                    <PostList
                        title="Posts list"
                        removePost={removePostHandler}
                        posts={sortAndSearchPosts}
                    />
                )}
                <div className="pagination-container">
                    {pagesArr.map((page, index) => (
                        <Btn
                            key={index}
                            onClick={(e) => changePage(page)}
                        >
                            {page}
                        </Btn>
                    ))}
                </div>
                
            </Wrapper>
        </div>
    );
}

export default App;
