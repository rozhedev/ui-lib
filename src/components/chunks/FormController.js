import styles from "./FormController.module.css";
import Inp from "../ui/Inp";
import inpStyles from "../ui/Inp.module.css";

const FormController = ({ type, formData, onChange, labelText, inpPlaceholder, ...props }) => {
    return (
        <div className={styles.FormController}>
            <label htmlFor="test-inp">{labelText}</label>
            <Inp
                placeholder={inpPlaceholder}
                className={inpStyles.Inp}
                formData={formData}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default FormController;
