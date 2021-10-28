import {useState, useRef} from 'react';

const useInput = (validator) => {
    const inputRef = useRef('');
    const [isValid, setIsValid] = useState(true);

    const value = inputRef.current.value; 
    console.log(value);

    const onBlur = () => {
        setIsValid(validator(inputRef.current.value));
    }

    const reset = () => {
        inputRef.current.reset();
    };

    return { inputRef, value: inputRef.current.value, isValid, onBlur, reset };
};

export default useInput;