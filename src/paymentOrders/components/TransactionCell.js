import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { formatCurrencyDisplay } from '../../utils/formatters';

const styles = theme => ({
    suggestion: {
        color: theme.palette.primary.main
    },
    userChoice: {
        color: theme.palette.accent.main
    },
    default: {
        color: "inherit"
    }
});

const Title = ({ transaction }) => {
    const formatDate = raw => moment(raw, 'YYYY-MM-DD').format('DD/MM/YYYY');

    if (transaction.payment_date)
        return `Pago em ${formatDate(transaction.payment_date)}`;

    return (
        <div>
            <p style={{ margin: 0 }}>{`Vencimento: ${formatDate(transaction.due_date)}`}</p>
            <p style={{ margin: 0 }}>{`Importância: ${transaction.priority}`}</p>
            <p style={{ margin: 0 }}>{`Tolerância: ${transaction.deadline}`}</p>
        </div>
    );
};

const TransactionCell = ({ transactions, onToggle, checked, classes }) => {
    return (
        <div>
            {transactions.map((transaction) => {
                const isPayed = !!transaction.payment_date;
                const isChecked = checked.indexOf(transaction.id) !== -1;

                return (
                    <div key={transaction.id}>
                        <Tooltip title={<Title transaction={transaction} />}>

                            <div className={classNames({
                                [classes.default]: !isChecked,
                                [classes.suggestion]: isChecked
                            })}>

                                <Button
                                    variant={isChecked ? "outlined" : undefined}
                                    color="inherit"
                                    disabled={isPayed}
                                    onClick={() => onToggle(transaction.id)}
                                >
                                    {formatCurrencyDisplay(-transaction.value, false)}
                                </Button>

                            </div>

                        </Tooltip>
                    </div>
                );
            })}
        </div>
    );
};

Title.propTypes = {
    transaction: PropTypes.object.isRequired,
};

TransactionCell.propTypes = {
    transactions: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionCell);
