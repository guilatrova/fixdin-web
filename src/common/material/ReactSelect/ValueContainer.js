/* eslint-disable react/prop-types */
import React from 'react';

const ValueContainer = (props) => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
};

export default ValueContainer;
