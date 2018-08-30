import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, operations } from '../../duck';
import MultiCategorySelectPicker from './../../../categories/components/MultiCategorySelectPicker';
import FilterWrapper from './FilterWrapper';

class CategoryFilter extends React.Component {
    static propTypes = {
        category: PropTypes.array.isRequired, //Although name is "category", actually it's an array of selected
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        category: []
    };

    constructor(props) {
        super(props);

        this.state = {
            category: props.category
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ category: nextProps.category });
    }

    handleSubmit = () => this.props.onSubmit(this.state.category);

    handleClear = () => this.props.onSubmit([]);

    render() {
        return (
            <FilterWrapper onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <MultiCategorySelectPicker
                    value={this.state.category}
                    onChange={(category) => this.setState({ category })} />
            </FilterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    category: selectors.getFilters(state).category || []
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (category) => {
        dispatch(operations.setFilters({ category }, true));
        dispatch(operations.filterTransactions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
