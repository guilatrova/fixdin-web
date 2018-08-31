import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField'; //TODO: Change to use autocomplete

import { selectors, operations } from '../../duck';
import FilterWrapper from './FilterWrapper';

class PriorityFilter extends React.Component {
    static propTypes = {
        priority: PropTypes.string.isRequired,
        prioritySource: PropTypes.array.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        priority: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            priority: props.priority
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ priority: nextProps.priority });
    }

    handleSubmit = () => this.props.onSubmit(this.state.priority);

    handleClear = () => this.props.onSubmit(undefined);

    render() {
        return (
            <FilterWrapper {...this.props} onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <TextField
                    fullWidth
                    label="Importancia"
                    value={this.state.priority}
                    onChange={e => this.setState({ priority: e.target.value })}
                />
            </FilterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    priority: selectors.getFilters(state).priority || "",
    prioritySource: selectors.getVisiblePriorities(state) || []
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (priority) => {
        dispatch(operations.setFilters({ priority }, true));
        dispatch(operations.filterTransactions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PriorityFilter);
