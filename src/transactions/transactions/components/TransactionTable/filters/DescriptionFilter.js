import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, operations } from '../../../duck';
import TransactionDescription from '../../TransactionDescription';
import FilterWrapper from './FilterWrapper';

class DescriptionFilter extends React.Component {
    static propTypes = {
        description: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        description: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            description: props.description
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ description: nextProps.description });
    }

    handleSubmit = () => this.props.onSubmit(this.state.description);

    handleClear = () => this.props.onSubmit(undefined);

    render() {
        return (
            <FilterWrapper {...this.props} onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <TransactionDescription
                    fullWidth
                    value={this.state.description}
                    onChange={description => this.setState({ description })}
                    onlyVisible={true}
                />
            </FilterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    description: selectors.getFilters(state).description || ""
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (description) => {
        dispatch(operations.setFilters({ description }, true));
        dispatch(operations.filterTransactions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionFilter);
