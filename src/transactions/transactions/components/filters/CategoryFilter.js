import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { selectors, operations } from '../../duck';
import MultiCategorySelectPicker from './../../../categories/components/MultiCategorySelectPicker';

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
            <div>
                <MultiCategorySelectPicker
                    value={this.state.category}
                    onChange={(category) => this.setState({ category })} />

                <Button color="default" onClick={this.handleClear}>Limpar</Button>
                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        category: selectors.getFilters(state).category || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (category) => {
            dispatch(operations.setFilters({ category }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);