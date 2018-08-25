import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormLabel from '@material-ui/core/FormLabel';
import ToggleButton, { ToggleButtonGroup } from '@material-ui/lab/ToggleButton';

import { EXPENSE, INCOME } from '../kinds';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        fontWeight: 'bold',
        color: theme.palette.primary.main
    }
});

const KindSwitch = ({ classes, value, onChange }) => {
    return (
        <div className={classes.root}>
            <FormLabel component="legend">Tipo</FormLabel>

            <ToggleButtonGroup value={value} exclusive onChange={onChange}>
                <ToggleButton classes={{ selected: classes.selected }} value={INCOME}>Receita</ToggleButton>
                <ToggleButton classes={{ selected: classes.selected }} value={EXPENSE}>Despesa</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

KindSwitch.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

KindSwitch.defaultProps = {
    value: EXPENSE
};

export default withStyles(styles)(KindSwitch);
