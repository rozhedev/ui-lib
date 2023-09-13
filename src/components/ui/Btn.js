import styles from "./Btn.module.css";

const Btn = ({ onClick, children, disabled = false, ...props }) => {
    return (
        <button
            className={` ${styles.Btn} ${disabled && styles.BtnDisabled}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Btn;
