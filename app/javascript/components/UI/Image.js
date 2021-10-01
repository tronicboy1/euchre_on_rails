import React from "react";

const Image = (props) => {
    const imageSrc = "data:image/png;base64," + props.src;

    return (
        <img src={imageSrc} />
    );
};

export default Image;