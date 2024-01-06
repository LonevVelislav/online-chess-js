import { useState } from "react";

export default function useForm(submitHanler, initValues) {
    const [values, setValues] = useState(initValues);

    const onChange = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        submitHanler(values);
    };

    return {
        values,
        onChange,
        onSubmit,
    };
}
