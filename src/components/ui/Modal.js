import styles from "../ui/Modal.module.css";
import Btn from "./Btn";

const Modal = ({ children, visible, setVisible, ...props }) => {
    const rootClasses = [styles.ModalOverlay];
    visible && rootClasses.push(styles.active);

    return (
        <div
            className={rootClasses.join(" ")}
            onClick={(e) => setVisible(false)}
        >
            <div
                className={styles.ModalBody}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <Btn onClick={(e) => setVisible(false)}>Close</Btn>
            </div>
        </div>
    );
};

export default Modal;
