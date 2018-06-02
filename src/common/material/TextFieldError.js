import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


const TextFieldError = ({label, error, ...other}) => {        
    return (
        <div>
            <FormControl error={!!error}>
                <InputLabel htmlFor="name-error">{label}</InputLabel>
                <Input id="name-error" {...other} />
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </div>
    );    
};

TextFieldError.propTypes = {
    classes: PropTypes.object,
    label: PropTypes.string.isRequired,
    error: PropTypes.string
};

export default TextFieldError;