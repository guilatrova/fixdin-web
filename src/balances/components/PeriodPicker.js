import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';
import IconButton from '@material-ui/core/IconButton';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import moment from 'moment';

const styles = theme => ({
    root: {
        color: theme.palette.accent.main
    },
    periodInput: {
        color: theme.palette.accent.main,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 40,
        cursor: 'pointer'
    },
    arrowButton: {
        width: "auto",
        height: "auto"
    }
});

const PeriodPicker = ({ classes, period, format, onChangePeriod, onDecreaseClick, onIncreaseClick }) => {
    const props = { onChange: onChangePeriod, color: "inherit" };

    return (
        <div className={classes.root}>
            <IconButton
                color="inherit"
                className={classes.arrowButton}
                onClick={() => onChangePeriod(onDecreaseClick(period))}
            >
                <LeftIcon />
            </IconButton>

            <DatePicker
                value={period}
                format={format}
                {...props}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        input: classes.periodInput
                    }
                }}
            />

            <IconButton
                color="inherit"
                className={classes.arrowButton}
                onClick={() => onChangePeriod(onIncreaseClick(period))}
            >
                <RightIcon />
            </IconButton>
        </div>
    );
};

PeriodPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    period: PropTypes.object.isRequired,
    format: PropTypes.string.isRequired,
    onChangePeriod: PropTypes.func.isRequired,
    onDecreaseClick: PropTypes.func.isRequired,
    onIncreaseClick: PropTypes.func.isRequired,
};

PeriodPicker.defaultProps = {
    onChange: () => { },
    onIncreaseClick: (period) => moment(period).add(1, "months"),
    onDecreaseClick: (period) => moment(period).subtract(1, "months"),
    format: "MMM-YY"
};

export default withStyles(styles)(PeriodPicker);
