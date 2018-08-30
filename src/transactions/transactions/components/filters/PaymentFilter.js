import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import DatePicker from 'material-ui-pickers/DatePicker';

import { selectors, operations } from '../../duck';
import FilterWrapper from './FilterWrapper';

const defaultStart = () => moment().startOf('month');
const defaultEnd = () => moment().endOf('month');

const styles = {
    flex: {
        display: "flex",
        alignItems: 'center',
    },
    margin: {
        marginLeft: 10
    }
};

class PaymentFilter extends React.Component {
    static propTypes = {
        payed: PropTypes.string.isRequired,
        payment_date_from: PropTypes.object.isRequired,
        payment_date_until: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            payed: props.payed,
            payment_date_from: props.payment_date_from,
            payment_date_until: props.payment_date_until
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            payed: nextProps.payed,
            payment_date_from: nextProps.payment_date_from,
            payment_date_until: nextProps.payment_date_until
        });
    }

    handleSubmit = () => {
        if (this.state.payed == "1") {
            this.props.onSubmit(this.state.payed, this.state.payment_date_from, this.state.payment_date_until);
        }
        else {
            this.props.onSubmit(this.state.payed, null, null);
        }
    }

    handleClear = () => this.props.onSubmit("-1", null, null);

    render() {
        const { classes } = this.props;

        return (
            <FilterWrapper onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <div className={classes.flex}>
                    <FormLabel component="legend">Pago</FormLabel>

                    <Select
                        className={classes.margin}
                        value={this.state.payed}
                        onChange={e => this.setState({ payed: e.target.value })}
                    >
                        <MenuItem value="-1">-</MenuItem>
                        <MenuItem value="0">NÃO</MenuItem>
                        <MenuItem value="1">SIM</MenuItem>
                    </Select>
                </div>

                {this.state.payed == "1" && <div>

                    <DatePicker
                        keyboard
                        autoOk
                        fullWidth
                        label="De"
                        value={this.state.payment_date_from}
                        onChange={(payment_date_from) => this.setState({ payment_date_from })}
                        format="DD/MM/YYYY"
                    />

                    <DatePicker
                        keyboard
                        autoOk
                        fullWidth
                        label="Até"
                        value={this.state.payment_date_until}
                        onChange={(payment_date_until) => this.setState({ payment_date_until })}
                        format="DD/MM/YYYY"
                    />

                </div>}
            </FilterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    payed: selectors.getFilters(state).payed || "-1",
    payment_date_from: selectors.getFilters(state).payment_date_from || defaultStart(),
    payment_date_until: selectors.getFilters(state).payment_date_until || defaultEnd(),
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (payed, payment_date_from, payment_date_until) => {
        dispatch(operations.setFilters({ payed, payment_date_from, payment_date_until }, true));
        dispatch(operations.filterTransactions());
    }
});

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(PaymentFilter)
);
