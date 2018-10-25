import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, operations } from '../../../duck';
import CategorySelectPicker from '../../../../categories/components/CategorySelectPicker';
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

    handleChange = options => this.setState({ category: options });

    render() {
        return (
            <FilterWrapper {...this.props} onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <CategorySelectPicker
                    isMulti
                    value={this.state.category}
                    onChange={this.handleChange} />
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
