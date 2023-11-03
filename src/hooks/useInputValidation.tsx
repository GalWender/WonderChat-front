import { useState, useEffect, useRef } from 'react';

interface FieldValidation {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

const useInputValidation = (
    initialInputValue: string,
    fieldName: string,
    validationRules: FieldValidation,
    debounceTime: number = 500
) => {
    const [inputValue, setInputValue] = useState(initialInputValue)
    const [error, setError] = useState<string>("")
    const firstTimeLengthRef = useRef(0)

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout | null = null;

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            if (inputValue.length > firstTimeLengthRef.current) {
                firstTimeLengthRef.current = -1
                validate(inputValue);
            }
        }, debounceTime);

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [inputValue])

    const validate = (value: string) => {
        const fieldErrors: string[] = []

        console.log('insidevalue', value);

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

    const isInputValid = () => {
        console.log(error);

        if (error === undefined || error === '') {
            validate(inputValue)
            return true
        }
        return false
    }

    const handleChange = (newValue: string) => {
        setInputValue(newValue);
    };

    return { inputValue, error, handleChange, isInputValid };
};

export default useInputValidation;