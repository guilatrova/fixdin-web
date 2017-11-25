import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'material-ui/Button';
import { DatePicker } from 'material-ui-pickers';

import { selectors, operations } from '../../duck';

class DueDateFilter extends React.Component {
    static propTypes = {
        due_date_from: PropTypes.object.isRequired,
        due_date_until: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            due_date_from: props.due_date_from,
            due_date_until: props.due_date_until
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            due_date_from: nextProps.due_date_from,
            due_date_until: nextProps.due_date_until
        });
    }

    handleSubmit = () => this.props.onSubmit(this.state.due_date_from, this.state.due_date_until);

    render() {
        return (
            <div>
                <DatePicker
                    label="De"                
                    value={this.state.due_date_from}
                    onChange={(due_date_from) => this.setState({ due_date_from })}
                    autoOk={true}
                    format="DD MMMM YYYY" />

                <DatePicker
                    label="Até"
                    value={this.state.due_date_until}
                    onChange={(due_date_until) => this.setState({ due_date_until })}
                    autoOk={true}
                    format="DD MMMM YYYY" />

                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        due_date_from: selectors.getFilters(state).due_date_from || moment().startOf('month'),
        due_date_until: selectors.getFilters(state).due_date_until || moment().endOf('month'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (due_date_from, due_date_until) => {
            dispatch(operations.setFilters({ due_date_from, due_date_until }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DueDateFilter);