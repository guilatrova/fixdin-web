import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

import { EXPENSE, INCOME } from '../kinds';

const KindSwitch = ({ value, onChange }) => {
    let expenseProps, incomeProps;
    
    if (value.id == EXPENSE.id) {
        expenseProps = { color: 'accent' };
        incomeProps = { };
    }
    else {
        expenseProps = { };
        incomeProps = { color: 'primary' };
    }

    return (
        <div>
            <Button {...incomeProps} onClick={() => onChange(INCOME)}>Receita</Button>
            <Button {...expenseProps} onClick={() => onChange(EXPENSE)}>Despesa</Button>
        </div>
    );    
};

KindSwitch.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

KindSwitch.defaultProps = {
    value: EXPENSE
};

export default KindSwitch;