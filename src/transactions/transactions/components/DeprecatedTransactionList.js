import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { formatCurrencyDisplay } from '../../../utils/formatters';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
});

class DeprecatedTransactionList extends React.Component {
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
                        onClick={() => this.handleToggle(id)}
                        checked={this.state.checked.indexOf(id) !== -1} />
                    <ListItemText primary={description} />

                    <ListItemSecondaryAction>
                        <ListItemText primary={value} />
                    </ListItemSecondaryAction>

                </ListItem>
            );
        });

        return (
            <div style={{ maxHeight: 300, overflow: 'auto' }}>
                {transactionItems.length == 0 && <Typography type="body2">Não há nada aqui</Typography>}
                <List>
                    {transactionItems}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DeprecatedTransactionList);
