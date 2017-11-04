import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

import { EXPENSE, INCOME } from '../../kinds';

class KindSwitch extends React.Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        value: EXPENSE
    }

    render() {
        const { value, onChange } = this.props;
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
    }
}

export default KindSwitch;