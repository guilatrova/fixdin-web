import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import { formatCurrencyDisplay } from '../../utils/formatters';

const TransactionsList = ({ classes, transactions, checked, onToggle }) => {    
    return (
        <List>
            {transactions.map(income => (
                <ListItem key={income.id} dense button className={classes.listItem}>
                    <ListItemText 
                        primary={`${income.description} (${formatCurrencyDisplay(income.value)})`} secondary={`${income.due_date.format('DD/MM/YYYY')}`} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onClick={() => onToggle(income.id)}
                            checked={checked.indexOf(income.id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
} ;

TransactionsList.propTypes = {
    classes: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default withStyles()(TransactionsList);