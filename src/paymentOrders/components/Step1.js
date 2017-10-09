import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { Grid, Row, Col, FormControl } from '@sketchpixy/rubix';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';

import { formatCurrencyDisplay } from '../../services/formatter';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
    formControl: {
      margin: theme.spacing.unit,
    },
});

class Step1 extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        incomes: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    state = {
        checked: [],
        untilDate: new Date()
    };

    componentDidUpdate() {
        this.props.onChange(this.state);
    }

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
            <Row>
                <Col xs={12} md={3}>

                        <DatetimeInput
                            timeFormat={false}
                            onChange={ (untilDate) => this.setState({ untilDate }) }
                            value={this.state.untilDate}
                            closeOnSelect={true}
                            closeOnTab={true} />
                            
                        <CurrencyInput 
                            className='border-focus-blue form-control'
                            onChange={ (valueToSave) => this.setState({ valueToSave }) }
                            value={this.state.valueToSave}
                            prefix="R$ "
                            decimalSeparator=","
                            thousandSeparator="." />
                    
                </Col>

                <Col xs={12} md={9}>
                    <List>
                        {incomes.map(income => (
                            <ListItem key={income.id} dense button className={classes.listItem}>
                                <ListItemText 
                                    primary={`${income.description} (${formatCurrencyDisplay(income.value)})`} secondary={`${income.due_date.format('DD/MM/YYYY')}`} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onClick={this.handleToggle(income.id)}
                                        checked={this.state.checked.indexOf(income.id) !== -1}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Col>
            </Row>
            </div>
        )
    }
}

export default withStyles(styles)(Step1);