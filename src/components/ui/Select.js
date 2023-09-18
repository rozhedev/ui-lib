import styles from "./Select.module.css";

const Select = ({ id, defaultValue, options, value, onChange, ...props }) => {
    /* <span>&#9660;</span> */

    return (
        <select
            name={id}
            id={id}
            title={id}
            className={styles.Select}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option
                key="disabled-option"
                disabled
                value="Сортировка по"
            >
                {defaultValue}
            </option>
            {options.map((opt) => (
                <option
                    key={opt.value}
                    value={opt.value}
                >
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
