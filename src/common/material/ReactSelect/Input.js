/* eslint-disable react/prop-types */
import React from 'react';

const Input = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
};

export default Input;
