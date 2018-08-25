/* eslint-disable react/prop-types */
import React from 'react';

import TextField from '@material-ui/core/TextField';

import Input from './Input';

const Control = (props) => {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent: Input,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
};

export default Control;
