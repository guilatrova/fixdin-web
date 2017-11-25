import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { DatePicker } from 'material-ui-pickers';

import { selectors, operations } from '../../duck';

class PaymentFilter extends React.Component {
    static propTypes = {
        payed: PropTypes.string.isRequired,
        payment_date_from: PropTypes.object.isRequired,
        payment_date_until: PropTypes.object.isRequired,
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

    render() {
        return (
            <div>
                <label>Pago?</label>

                <Select
                    value={this.state.payed}
                    onChange={e => this.setState({ payed: e.target.value })}
                >
                    <MenuItem value="-1">-</MenuItem>
                    <MenuItem value="0">NÃO</MenuItem>
                    <MenuItem value="1">SIM</MenuItem>
                </Select>

                {this.state.payed == "1" && <div>

                    <DatePicker
                        label="De"
                        value={this.state.payment_date_from}
                        onChange={(payment_date_from) => this.setState({ payment_date_from })}
                        autoOk={true}
                        format="DD MMMM YYYY"
                    /> 

                    <DatePicker
                        label="Até"
                        value={this.state.payment_date_until}
                        onChange={(payment_date_until) => this.setState({ payment_date_until })}
                        autoOk={true}
                        format="DD MMMM YYYY"
                    /> 

                </div>}

                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        payed: selectors.getFilters(state).payed || "-1",
        payment_date_from: selectors.getFilters(state).payment_date_from || moment().startOf('month'),
        payment_date_until: selectors.getFilters(state).payment_date_until || moment().endOf('month'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (payed, payment_date_from, payment_date_until) => {
            dispatch(operations.setFilters({ payed, payment_date_from, payment_date_until }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFilter);