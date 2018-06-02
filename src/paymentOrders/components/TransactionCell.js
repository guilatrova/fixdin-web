import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

import { formatCurrencyDisplay } from '../../utils/formatters';

const Title = ({ transaction }) => {
    const formatDate = raw => moment(raw, 'YYYY-MM-DD').format('DD/MM/YYYY');

    if (transaction.payment_date)
        return `Pago em ${formatDate(transaction.payment_date)}`;

    return (
        <div>
            <p style={{ margin: 0}}>{`Vencimento: ${formatDate(transaction.due_date)}`}</p>
            <p style={{ margin: 0}}>{`Importância: ${transaction.priority}`}</p>
            <p style={{ margin: 0}}>{`Tolerância: ${transaction.deadline}`}</p>
        </div>
    );
};

Title.propTypes = {
    transaction: PropTypes.object.isRequired
};

const TransactionCell = ({transactions, checked, onToggle}) => {
    return (
        <div>
            {transactions.map((transaction) => {
                const isPayed = !!transaction.payment_date;
                    
                return (
                    <div key={transaction.id}>
                        <Tooltip title={<Title transaction={transaction} />}>
                            <FormControlLabel
                                disabled={isPayed}
                                label={formatCurrencyDisplay(-transaction.value, false)}
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