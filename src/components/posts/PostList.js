import PostItem from "./PostItem";
import styles from "./PostList.module.css";

const PostList = ({ title, removePost, posts, ...props }) => {
    let startText = "Post list is empty";
    return (
        <>
            <h3>{title}</h3>
            <div className={styles.PostList}>
                {posts.map((post) => (
                    <PostItem
                        removePost={removePost}
                        post={post}
                        key={post.id}
                    />
                ))}
            </div>
        </>
    );
};

export default PostList;
