import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';

import { formatCurrencyDisplay } from '../../utils/formatters';

const TransactionCell = ({transactions, checked, onToggle}) => {
    return (
        <div>
            {transactions.map((transaction) => {
                const isPayed = !!transaction.payment_date;
                const title = isPayed ? `Pago em ${moment(transaction.payment_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}` : `Importância: ${transaction.priority}`
                return (
                    <div key={transaction.id}>
                        <Tooltip title={title}>
                            <FormControlLabel
                                disabled={isPayed}
                                label={formatCurrencyDisplay(-transaction.value)}
                                onClick={() => onToggle(transaction.id)}
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={isPayed || checked.indexOf(transaction.id) !== -1}
                                        onChange={() => onToggle(transaction.id)}
                                    />}
                            />
                        </Tooltip>
                    </div>
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