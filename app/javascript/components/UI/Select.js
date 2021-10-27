import React from "react";

const Select = (props, ref) => {
    const options = props.options.map(option => <option key={option[1]} value={option[1]}>{option[0]}</option>)
    return (
        <select ref={ref} >{options}</select>
    )
};

export default React.forwardRef(Select);