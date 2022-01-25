import { useFormikContext } from "formik";
import React from "react";


export const AutoSubmit = () => {

    const { values, submitForm } = useFormikContext();
    React.useEffect(() => {

        // if (values.token.length === 6) {
        //     submitForm();
        // }
    }, [values, submitForm]);
    return null;
};