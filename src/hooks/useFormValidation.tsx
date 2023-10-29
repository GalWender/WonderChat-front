import { useState, useEffect } from 'react';

interface FieldValidation {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

interface FormValidation {
    [key: string]: FieldValidation;
}

interface ValidationErrors {
    [key: string]: string;
}

export const useFormValidation = (initialState: Record<string, string>, validationRules: FormValidation) => {
    const [formState, setFormState] = useState(initialState);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [currFieldName,setCurrFieldName] = useState<string>("")

    const validateField = (fieldName: string, value: string) => {
        const fieldRules = validationRules[fieldName];
        const fieldErrors: string[] = [];

        if (fieldRules.required && value.trim() === '') {
            fieldErrors.push('This field is required.');
        }

        if (fieldRules.minLength && value.length < fieldRules.minLength) {
            fieldErrors.push(`Minimum length is ${fieldRules.minLength} characters.`);
        }

        if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
            fieldErrors.push(`Maximum length is ${fieldRules.maxLength} characters.`);
        }

        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            fieldErrors.push(`Invalid ${fieldName}`);
        }
        // console.log('fielderrors',fieldErrors);
        // console.log(fieldName, fieldErrors);


        setErrors({ ...errors, [fieldName]: fieldErrors[0] })
        // console.log(errors);

    }

    useEffect(() => {
        if(currFieldName) {
            validateField(currFieldName, formState[currFieldName])
        }
    }, [formState]);

    const handleChange = (fieldName: string, value: string) => {
        console.log("data", fieldName, value)
        setFormState({ ...formState, [fieldName]: value })
        setCurrFieldName(fieldName)
    }

    const isFormValid = () => {
        for (const fieldName in errors) {
            if (errors[fieldName].length > 0) {
                return false;
            }
        }
        return true;
    };

    const resetForm = () => {
        setFormState(initialState);
        setErrors({});
    };

    return {
        formState,
        errors,
        handleChange,
        isFormValid,
        resetForm,
    };
}