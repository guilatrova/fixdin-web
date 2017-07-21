import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { fetchCategories } from './../actions';

class MultiCategorySelectPicker extends React.Component {

    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(options) {
        this.props.onChange(options.map(opt => opt.value));
    }

    render() {
        const { categories, isFetching, value } = this.props;
        
        const options = categories.map(category => {
            return {
                value: category.id, 
                label: category.name
            }
        });

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

const mapStateToProps = (state) => {
    return {
        ...state.categories
    }
}

export default connect(mapStateToProps)(MultiCategorySelectPicker);