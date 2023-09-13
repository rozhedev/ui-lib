import styles from "./Wrapper.module.css";

const Wrapper = ({ children, ...props }) => {
    return <div className={styles.Wrapper}>{children}</div>;
};
export default Wrapper;
