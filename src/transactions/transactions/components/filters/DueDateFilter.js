import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'material-ui/Button';
import DatetimeInput from 'react-datetime';

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

    handleDateOnBlur = (id, value) => {
        if (!moment.isMoment(value)) {
            this.setState({ [id]: moment() });
        }
    }

    render() {
        return (
            <div>
                <label>De</label>
                <DatetimeInput
                    timeFormat={false}
                    onChange={(due_date_from) => this.setState({ due_date_from })}
                    onBlur={(value) => handleDateOnBlur('due_date_from', value)}
                    value={this.state.due_date_from}
                    closeOnSelect={true}
                    closeOnTab={true} />

                <label>Até</label>
                <DatetimeInput
                    timeFormat={false}
                    onChange={(due_date_until) => this.setState({ due_date_until })}
                    onBlur={(value) => onBlur('due_date_until', value)}
                    value={this.state.due_date_until}
                    closeOnSelect={true}
                    closeOnTab={true} />

                <Button raised onClick={this.handleSubmit}>Aplicar</Button>
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
            dispatch(operations.setFilters({ due_date_from, due_date_until }));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DueDateFilter);