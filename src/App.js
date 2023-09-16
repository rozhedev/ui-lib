import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayAnim } from "./data/anim-config";
import { API_LINKS } from "./data/api-keys";

import "./App.css";
import Counter from "./components/chunks/Counter";
import Wrapper from "./layout/Wrapper";
import PostForm from "./components/posts/PostForm";
import PostList from "./components/posts/PostList";
import PostFilters from "./components/posts/PostFilters";
import Modal from "./components/ui/Modal";
import Btn from "./components/ui/Btn";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/ui/Loader";

function App() {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        sort: "",
        query: "",
    });
    const sortAndSearchPosts = usePosts(posts, filters.sort, filters.query);

    // * Modal state
    const [visible, setVisible] = useState(false);
    // * Load state
    const [isPostsLoad, setIsPostsLoad] = useState(false);

    // * HANDLERS

    const createPostHandler = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    };

    const removePostHandler = (id) => {
        const newList = posts.filter((p) => p.id !== id);
        setPosts(newList);
    };

    // * Posts load
    async function fetchPosts() {
        setIsPostsLoad(true);

        const purePosts = await PostService.getAll(API_LINKS.getPosts);
        // * Convert id to string for correct sort working
        const posts = await purePosts.map((post) => ({ ...post, id: post.id.toString() }));

        setPosts(posts);
        setIsPostsLoad(false);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

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

                {isPostsLoad ? (
                    <Loader/>
                ) : (
                    <PostList
                        title="Posts list"
                        removePost={removePostHandler}
                        posts={sortAndSearchPosts}
                    />
                )}
            </Wrapper>
        </div>
    );
}

export default App;
