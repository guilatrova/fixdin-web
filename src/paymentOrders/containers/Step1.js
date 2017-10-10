import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { Grid, Row, Col } from '@sketchpixy/rubix';
import DatetimeInput from 'react-datetime';
import CurrencyInput from 'react-currency-input';

import IncomesList from '../components/IncomesList';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    }
});

export class Step1 extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        incomes: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        this.state = {
            checked: this.getDefaultIncomesToBeChecked(props.incomes),
            visibleIncomes: this.getIncomesUntil(props.incomes, today),
            untilDate: today
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState != this.state) {
            this.props.onChange(this.state);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.incomes.length == 0 && nextProps.incomes.length > 0) {
            this.setState({ 
                checked: this.getDefaultIncomesToBeChecked(nextProps.incomes),
                visibleIncomes: this.getIncomesUntil(nextProps.incomes)
            });
        }
    }

    getDefaultIncomesToBeChecked = incomes => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return incomes.filter(income => 
            income.due_date.isSameOrAfter(today)).map(income => income.id);
    }

    getIncomesUntil = (incomes, untilDate) => {
        if (!untilDate) {
            untilDate = this.state.untilDate;
        }

        return incomes.filter(income => income.due_date.isSameOrBefore(untilDate))
    }

    handleDateChange = untilDate => {
        this.setState({ 
            untilDate,
            visibleIncomes: this.getIncomesUntil(this.props.incomes, untilDate)
        });
    }

    handleToggle = value => {
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
        const { classes } = this.props;
        const { visibleIncomes, checked } = this.state;

        return (
            <div className={classes.root}>
            <Row>
                <Col xs={12} md={3}>

                    <DatetimeInput
                        onChange={this.handleDateChange}
                        value={this.state.untilDate}
                        timeFormat={false}
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
                    <IncomesList
                        incomes={visibleIncomes}
                        checked={checked}
                        onToggle={this.handleToggle} />
                </Col>
            </Row>
            </div>
        )
    }
}

export default withStyles(styles)(Step1);