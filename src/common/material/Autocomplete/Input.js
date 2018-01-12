/* eslint-disable react/prop-types */
import React from 'react';

import TextField from 'material-ui/TextField';
import TextFieldError from '../TextFieldError';

const Input = (props) => {
    const { classes, error, autoFocus, value, label, ref, ...other } = props;
    
    return (
        <TextFieldError
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            label={label}
            error={error}
            classes={
                {input: classes.input}
            }
            {...other}
        />
    );

    // return (
    //     <TextField
    //         autoFocus={autoFocus}
    //         className={classes.textField}
    //         value={value}
    //         inputRef={ref}
    //         label={label}
    //         InputProps={{
    //             classes: {
    //                 input: classes.input,
    //             },
    //             ...other,
    //         }}
    //     />
    // );
};

export default Input;