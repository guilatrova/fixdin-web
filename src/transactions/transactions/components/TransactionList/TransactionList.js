import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, ...props }) => {
    return (
        <List>
            {transactions.map(t => <TransactionItem key={t.id} transaction={t} {...props} />)}
        </List>
    );
};

TransactionList.propTypes = {
    transactions: PropTypes.array.isRequired
};

export default TransactionList;
