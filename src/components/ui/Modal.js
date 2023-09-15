import { motion } from "framer-motion";
import styles from "../ui/Modal.module.css";

const Modal = ({ children, visible, setVisible, ...props }) => {
    const rootClasses = [styles.ModalOverlay];
    const modalBodyAnim = {
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
    visible && rootClasses.push(styles.active);

    return (
        <div
            className={rootClasses.join(" ")}
            onClick={(e) => setVisible(false)}
        >
            <motion.div
                initial="initial"
                animate="animate"
                exit="initial"
                variants={modalBodyAnim}
            >
                <div
                    className={styles.ModalBody}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                    <button
                        type="button"
                        className={styles.ModalCloseBtn}
                        onClick={(e) => setVisible(false)}
                    >
                        &#128473;
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
