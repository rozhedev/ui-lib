
const Inp = ({ formData, onChange, name, setFormData, ...props }) => {
    return (
        <input
            value={formData}
            onChange={onChange}
            {...props}
        />
    );
};

export default Inp;
