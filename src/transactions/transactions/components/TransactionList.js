import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
});

class TransactionList extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired
    }

    state = {
        checked: []
    };

    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
            checked: newChecked,
        });
    }

    render() {
        const transactionItems = this.props.transactions.map(transaction => {
            return (
                <ListItem dense button key={transaction.id}>
                    <ListItemText primary={`${transaction.description} (${transaction.value})`} />

                    <ListItemSecondaryAction>
                        <Checkbox
                            onClick={e => this.handleToggle(transaction.id)}
                            checked={this.state.checked.indexOf(value) !== -1} />
                    </ListItemSecondaryAction>

                </ListItem>
            );
        });

        return (
            <div>
                <List>
                    {transactionItems}
                </List>
            </div>
        );
    }
};

export default withStyles(styles)(TransactionList);