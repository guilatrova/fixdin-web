import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';

import { formatCurrencyDisplay } from '../../../../utils/formatters';

const TransactionSecondaryAction = ({ transaction, onPay, isFetching }) => {
    const payed = !!transaction.payment_date;
    return (
        <React.Fragment>
            {formatCurrencyDisplay(transaction.value)}
            <Checkbox color="primary" checked={payed} onClick={() => onPay(transaction.id)} disabled={isFetching} />
        </React.Fragment>
    );
};

TransactionSecondaryAction.propTypes = {
    transaction: PropTypes.object.isRequired,
    onPay: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
};

export default TransactionSecondaryAction;
