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
