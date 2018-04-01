import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

const styles = () => ({
    payed: {
        color: green['A700'],
        whiteSpace: 'nowrap'
    },
    pending: {
        color: red['A700'],
        whiteSpace: 'nowrap'
    }
});

const PayedSign = ({ pending, classes }) => {
    const className = pending ? classes.pending : classes.payed;
    return <span className={className}>$</span>;
};

PayedSign.propTypes = {
    pending: PropTypes.bool,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PayedSign);