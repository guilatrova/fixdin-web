import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField'; //TODO: Change to use autocomplete

import { selectors, operations } from '../../duck';
import FilterWrapper from './FilterWrapper';

class DeadlineFilter extends React.Component {
    static propTypes = {
        deadline: PropTypes.string.isRequired,
        deadlineSource: PropTypes.array.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        deadline: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            deadline: props.deadline
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ deadline: nextProps.deadline });
    }

    handleSubmit = () => this.props.onSubmit(this.state.deadline);

    handleClear = () => this.props.onSubmit(undefined);

    render() {
        return (
            <FilterWrapper {...this.props} onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <TextField
                    fullWidth
                    name="deadline"
                    label="Tolerância"
                    value={this.state.deadline}
                    onChange={e => this.setState({ deadline: e.target.value })}
                />
            </FilterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    deadline: selectors.getFilters(state).deadline || "",
    deadlineSource: selectors.getVisibleDeadlines(state) || []
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (deadline) => {
        dispatch(operations.setFilters({ deadline }, true));
        dispatch(operations.filterTransactions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeadlineFilter);
