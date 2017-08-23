import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

import { formatCurrencyDisplay } from '../../../services/formatter';

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
            const { id, description } = transaction;
            const value = formatCurrencyDisplay(transaction.value);

            return (
                <ListItem dense button key={id}>
                    <Checkbox
                        onClick={e => this.handleToggle(id)}
                        checked={this.state.checked.indexOf(id) !== -1} />                        
                    <ListItemText primary={description} />

                    <ListItemSecondaryAction>
                        <ListItemText primary={value} />
                    </ListItemSecondaryAction>

                </ListItem>
            );
        });

        return (
            <div style={{maxHeight: 300, overflow: 'auto'}}>
                {transactionItems.length == 0 && <Typography type="body2">Não há nada aqui</Typography>}
                <List>
                    {transactionItems}
                </List>
            </div>
        );
    }
};

export default withStyles(styles)(TransactionList);