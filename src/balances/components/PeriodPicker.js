import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'

import { DatePicker } from '@material-ui/core-pickers';

const styles = theme => ({
    periodInput: {
        color: theme.palette.primary.main,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right'        
    },
});

const PeriodPicker = ({ classes, period, onChangePeriod }) => {
    const dummyFunc = () => {};
    const props = onChangePeriod ? 
        { onChange: onChangePeriod } : 
        { onClick: dummyFunc, onChange: dummyFunc };
    return (
        <DatePicker
            value={period}
            format="MMM-YY"
            {...props}
            InputProps={{
                disableUnderline: true,
                classes: {
                    input: classes.periodInput
                }
            }}
        />
    );
};

PeriodPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    period: PropTypes.object.isRequired,
    onChangePeriod: PropTypes.func,
};

export default withStyles(styles)(PeriodPicker);