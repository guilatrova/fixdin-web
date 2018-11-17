import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';

import IconOptionButton from './../../../../common/components/IconOptionButton';
import { formatCurrencyDisplay } from '../../../../utils/formatters';
import deleteIconSrc from '../../../../styles/icons/garbageIcon.png';

const TransactionSecondaryAction = ({ transaction, onPay, onDelete, isFetching }) => {
    const payed = !!transaction.payment_date;
    return (
        <React.Fragment>
            {formatCurrencyDisplay(transaction.value)}
            <IconOptionButton onClick={() => onDelete(transaction.id)} src={deleteIconSrc} />
            <Checkbox color="primary" checked={payed} onClick={() => onPay(transaction.id)} disabled={isFetching} />
        </React.Fragment>
    );
};

TransactionSecondaryAction.propTypes = {
    transaction: PropTypes.object.isRequired,
    onPay: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
};

export default TransactionSecondaryAction;
