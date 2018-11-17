import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import TransactionSecondaryAction from './TransactionSecondaryAction';

const TransactionItem = ({ transaction, onEdit, onPay, isFetching }) => (
    <ListItem button onClick={() => onEdit(transaction.id)}>
        <Avatar>
            <ImageIcon />
        </Avatar>

        <ListItemText
            primary={transaction.description}
            secondary={transaction.due_date.format('DD/MM/YY')}
        />

        <ListItemSecondaryAction>
            <TransactionSecondaryAction transaction={transaction} onPay={onPay} isFetching={isFetching} />
        </ListItemSecondaryAction>
    </ListItem>
);

TransactionItem.propTypes = {
    transaction: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onPay: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
};

export default TransactionItem;
