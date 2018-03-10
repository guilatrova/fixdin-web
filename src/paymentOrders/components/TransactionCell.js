import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

import { formatCurrencyDisplay } from '../../utils/formatters';

const TransactionCell = ({transactions, checked, onToggle}) => {
    return (
        <div>
            {transactions.map((transaction) => {
                return (
                    <FormGroup row key={transaction.id}>
                        <FormControlLabel
                            label={formatCurrencyDisplay(transaction.value)}
                            onClick={() => onToggle(transaction.id)}
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={checked.indexOf(transaction.id) !== -1}
                                    onChange={() => onToggle(transaction.id)}
                                />}
                        />
                    </FormGroup>
                );
            })}
        </div>
    );
};

TransactionCell.propTypes = {
    transactions: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default TransactionCell;