import { useState, useEffect } from 'react';

interface FieldValidation {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

const useInputValidation = (
    initialInputValue: string,
    fieldName:string,
    validationRules: FieldValidation,
    debounceTime: number = 1000
) => {
    const [inputValue, setInputValue] = useState(initialInputValue)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout | null = null;

        const validate = (value: string) => {
            const fieldErrors: string[] = []

            if (validationRules.required && value.trim() === '') {
                fieldErrors.push('This field is required.');
            }
            if (validationRules.minLength && value.length < validationRules.minLength) {
                fieldErrors.push(`Minimum length is ${validationRules.minLength} characters.`);
            }
    
            if (validationRules.maxLength && value.length > validationRules.maxLength) {
                fieldErrors.push(`Maximum length is ${validationRules.maxLength} characters.`);
            }
    
            if (validationRules.pattern && !validationRules.pattern.test(value)) {
                fieldErrors.push(`Invalid ${fieldName}`);
            }

            setError(fieldErrors[0])
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            validate(inputValue);
        }, debounceTime);

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [inputValue])

    const handleChange = (newValue: string) => {
        setInputValue(newValue);
    };

    return { inputValue, error, handleChange };
};

export default useInputValidation;