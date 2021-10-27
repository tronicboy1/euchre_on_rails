import React from "react";

const Select = (props, ref) => {
    const Options = props.options.map(option => <option value={option[1]}>{option[0]}</option>)
    return (
        <select ref={ref} ><Options /></select>
    )
};

export default React.forwardRef(Select);