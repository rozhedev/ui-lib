import { AnimatePresence, motion } from "framer-motion";
import PostItem from "./PostItem";
import styles from "./PostList.module.css";

const PostList = ({ title, removePost, posts, ...props }) => {
    const TEXT_CONTENT = {
        startTitle: "Post list is empty",
        blogTitle: "Post title",
    };
    const itemAnim = {
        initial: {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
        },
        animate: {
            opacity: 1,
            scale: 1,
            duration: 0.3,
        },
    };

    return (
        <>
            {posts.length ? <h3>{TEXT_CONTENT.blogTitle}</h3> : <h3>{TEXT_CONTENT.startTitle}</h3>}

            <motion.div style={{ width: "100%" }}>
                <div className={styles.PostList}>
                    <AnimatePresence>
                        {posts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial="initial"
                                animate="animate"
                                exit="initial"
                                variants={itemAnim}
                            >
                                <PostItem
                                    removePost={removePost}
                                    post={post}
                                    itemAnim={itemAnim}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
};

export default PostList;
