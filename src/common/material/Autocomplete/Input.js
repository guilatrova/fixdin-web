/* eslint-disable react/prop-types */
import React from 'react';

import TextField from 'material-ui/TextField';

const Input = (props) => {
    const { classes, autoFocus, value, label, ref, ...other } = props;
    
    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            label={label}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
};

export default Input;