import { AnimatePresence, motion } from "framer-motion";
import { postItemAnim } from "../../data/anim-config";

import PostItem from "./PostItem";
import styles from "./PostList.module.css";

const PostList = ({ title, removePost, posts, ...props }) => {
    const TEXT_CONTENT = {
        startTitle: "Post list is empty",
        blogTitle: "Post title",
    };

    return (
        <>
            {posts.length ? <h3>{TEXT_CONTENT.blogTitle}</h3> : <h3>{TEXT_CONTENT.startTitle}</h3>}

            <div className={styles.PostList}>
                <AnimatePresence>
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            variants={postItemAnim}
                        >
                            <PostItem
                                removePost={removePost}
                                post={post}
                                itemAnim={postItemAnim}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
};

export default PostList;
