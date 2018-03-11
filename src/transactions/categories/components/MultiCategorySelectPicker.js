import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select'; //TODO: Change it to Autocomplete support

import { selectors } from'../duck';
import { EXPENSE, INCOME } from '../../shared/kinds';

class MultiCategorySelectPicker extends React.Component {

    static propTypes = {
        kind: PropTypes.object,
        isFetching: PropTypes.bool.isRequired,
        value: PropTypes.array,
        onChange: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
    }

    handleOnChange = (options) => this.props.onChange(options.map(opt => opt.value));

    render() {
        const { isFetching, value, kind } = this.props;

        let categories = this.props.categories;
        if (kind && (kind.id == EXPENSE.id || kind.id == INCOME.id)) {
            categories = this.props.categories.filter(category => category.kind === kind.id);
        }
        
        const options = categories.map(category => ({
            value: category.id, 
            label: category.name
        }));

        return (
            <Select multi
                placeholder="Escolha suas categorias"
                options={options}
                isLoading={isFetching}
                disabled={isFetching}
                autosize={false}
                value={value}
                onChange={this.handleOnChange}/>
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: selectors.isFetching(state),
    categories: selectors.getCategories(state)
});

export default connect(mapStateToProps)(MultiCategorySelectPicker);