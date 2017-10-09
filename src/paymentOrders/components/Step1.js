import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
});

class Step1 extends React.Component {
    static propTypes = {
        incomes: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
    }

    state = {
        checked: []
    };

    handleToggle = value => () => {
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
    };

    render() {
        const { classes, incomes } = this.props;

        return (
            <div className={classes.root}>
            <List>
                {incomes.map(income => (
                    <ListItem key={income.id} dense button className={classes.listItem}>
                        <ListItemText primary={`${income.description} (${income.value})`} secondary={`${income.due_date}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                onClick={this.handleToggle(income.id)}
                                checked={this.state.checked.indexOf(income.id) !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            </div>
        )
    }
}

export default withStyles(styles)(Step1);