import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import TransactionSecondaryAction from './TransactionSecondaryAction';
import TransactionTable from '../TransactionTable';

const TransactionItem = ({ transaction, onEdit, ...props }) => (
    <ListItem button onClick={() => onEdit(transaction.id)}>
        <Avatar>
            <ImageIcon />
        </Avatar>

        <ListItemText
            primary={transaction.description}
            secondary={transaction.due_date.format('DD/MM/YY')}
        />

        <ListItemSecondaryAction>
            <TransactionSecondaryAction transaction={transaction} {...props} />
        </ListItemSecondaryAction>
    </ListItem>
);

TransactionItem.propTypes = {
    transaction: PropTypes.object.isRequired,
    ...TransactionTable.propTypes
};

export default TransactionItem;
