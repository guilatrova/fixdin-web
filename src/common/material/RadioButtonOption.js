import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = {
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
};

const RadioButtonOption = ({ classes, label, children, checked, ...props }) => {
    return (
        <div className={classes.flex}>
            <FormControlLabel label={label}
                control={<Radio color="primary" checked={checked} {...props} />}
            />

            {checked && children}

        </div>
    );
};

RadioButtonOption.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    ...Radio.propTypes
};

export default withStyles(styles)(RadioButtonOption);
