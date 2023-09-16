import styles from "../ui/Loader.module.css";

const Loader = ({ ...props }) => {
    return (
        <div className={styles.LdsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;
