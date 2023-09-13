import PostItem from "./PostItem";
import styles from "./PostList.module.css";

const PostList = ({ title, removePost, posts, ...props }) => {
    return (
        <div className={styles.PostList}>
            {posts.map((post) => (
                <PostItem
                    removePost={removePost}
                    post={post}
                    key={post.id}
                />
            ))}
        </div>
    );
};

export default PostList;
