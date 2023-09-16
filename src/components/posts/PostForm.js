import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import FormController from "../chunks/FormController";
import Btn from "../ui/Btn";
import styles from "./PostForm.module.css";

const PostForm = ({ createPost, posts, ...props }) => {
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const addPostHandler = (e) => {
        e.preventDefault();

        const newPost = {
            ...formData,
            id: uuidv4(),
        };
        createPost(newPost);

        setFormData({
            title: "",
            body: "",
        });
    };

    return (
        <form
            method="get"
            onSubmit={addPostHandler}
            className={styles.PostForm}
        >
            <h3>Post form</h3>
            <FormController
                type="text"
                name="post-title"
                id="post-title"
                title="post-title"
                labelText="Post title"
                inpPlaceholder="Enter title..."
                formData={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <FormController
                type="text"
                name="post-content"
                id="post-content"
                title="post-content"
                labelText="Post content"
                inpPlaceholder="Enter content..."
                formData={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            />
            <Btn type="submit">Publish</Btn>
        </form>
    );
};

export default PostForm;
