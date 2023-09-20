import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { usePosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";

import { modalOverlayAnim } from "./data/anim-config";
import { API_LINKS } from "./data/api-keys";
import { getPagesCount } from "./utils/getPagesCount";
import { useObserver } from "./hooks/useObserver";
import { usePagination } from "./hooks/usePagination";

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
import Pagination from "./components/ui/Pagination";

function App() {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        sort: "",
        query: "",
    });
    const sortAndSearchPosts = usePosts(posts, filters.sort, filters.query);

    // * Pagination hook
    const postsLoadLimit = 10;
    const [totalPagesCount, setTotalPagesCount, postsLimit, postPage, setPostPage, pagesArr] = usePagination(0, postsLoadLimit, 1);

    // * Modal state
    const [visible, setVisible] = useState(false);

    //*  Load & error handling
    const [fetchPosts, isPostsLoad, loadErr] = useFetching(async () => {
        const res = await PostService.getAll(API_LINKS.getPosts, postsLimit, postPage);
        const json = await res.json();

        // * Rewrite id via uuidv4() for correct sort working
        const newPosts = json.map((post) => ({
            ...post,
            id: uuidv4(),
        }));
        setPosts(newPosts);

        const totalCount = res.headers.get("X-Total-Count");

        // * after fetching change state uses f(x) from utils/getPagesCount.js
        setTotalPagesCount(getPagesCount(totalCount, postsLimit));
    });

    // * Infinite posts load
    const lastElemRef = useRef();
    const loadCondition = postPage < totalPagesCount;

    useObserver(lastElemRef, isPostsLoad, loadCondition, () => {
        setPostPage(postPage + 1);
    });

    // * Use effect update current post page num
    useEffect(() => {
        fetchPosts();
    }, [postPage]);

    // * HANDLERS

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

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

                <PostList
                    title="Posts list"
                    removePost={removePostHandler}
                    posts={sortAndSearchPosts}
                />
                {isPostsLoad && <Loader />}

                <Pagination
                    pagesArr={pagesArr}
                    postPage={postPage}
                    setPostPage={setPostPage}
                />
                <div
                    ref={lastElemRef}
                    style={{
                        margin: "8rem auto",
                        height: "1px",
                        display: loadCondition ? "block" : "none",
                    }}
                >{loadCondition && <Loader/>}</div>
            </Wrapper>
        </div>
    );
}

export default App;
