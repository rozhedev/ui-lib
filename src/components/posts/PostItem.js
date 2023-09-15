import Btn from "../ui/Btn";
import styles from "./PostItem.module.css";

const PostItem = ({ post, removePost }) => {
    return (
        <div className={styles.PostItem}>
            <h4>{post.title}</h4>
            <div className={styles.PostContent}>
                <p>{post.content}</p>
                <small>Post id: {post.id.substr(0, 5)}</small>
            </div>
            <div className={styles.BtnGroup}>
                <Btn
                    type="button"
                    onClick={(e) => removePost(post.id)}
                >
                    Delete post
                </Btn>
            </div>
        </div>
    );
};

export default PostItem;
