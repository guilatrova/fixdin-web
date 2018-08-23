import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

import { EXPENSE, INCOME } from '../kinds';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selected: {
        fontWeight: 'bold'
    }
};

const KindSwitch = ({ classes, value, onChange }) => {
    let expenseProps, incomeProps;

    if (value.id == EXPENSE.id) {
        expenseProps = { color: 'primary', variant: 'outlined', className: classes.selected };
        incomeProps = {};
    }
    else {
        expenseProps = {};
        incomeProps = { color: 'primary', variant: 'outlined', className: classes.selected };
    }

    return (
        <div className={classes.root}>
            <FormLabel component="legend">Tipo</FormLabel>

            <div>
                <Button {...incomeProps} onClick={() => onChange(INCOME)}>Receita</Button>
                <Button {...expenseProps} onClick={() => onChange(EXPENSE)}>Despesa</Button>
            </div>
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
