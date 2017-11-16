import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

const TextFieldError = ({label, value, onChange, error, classes, ...other}) => {        
    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl} error={!!error}>
                <InputLabel htmlFor="name-error">{label}</InputLabel>
                <Input id="name-error" value={value} onChange={onChange} {...other} />
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </div>
    );    
};

TextFieldError.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default withStyles(styles)(TextFieldError);