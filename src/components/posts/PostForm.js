import { useState } from "react";
import FormController from "../chunks/FormController";
import Btn from "../ui/Btn";
import styles from "./PostForm.module.css";

const PostForm = ({ addPost, formData, setFormData, ...props }) => {
    return (
        <form
            method="get"
            onSubmit={addPost}
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
                formData={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <Btn type="submit">Publish</Btn>
        </form>
    );
};

export default PostForm;
