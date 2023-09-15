import { motion } from "framer-motion";
import { modalBodyAnim } from "../../data/anim-config";

import styles from "../ui/Modal.module.css";

const Modal = ({ children, visible, setVisible, ...props }) => {
    const rootClasses = [styles.ModalOverlay];
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
