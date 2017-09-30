import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import { EXPENSE, INCOME, ALL } from '../../kinds';

class MultiCategorySelectPicker extends React.Component {

    static propTypes = {
        kind: PropTypes.object,
        isFetching: PropTypes.bool.isRequired,
        value: PropTypes.any
    }

    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(options) {
        this.props.onChange(options.map(opt => opt.value));
    }

    render() {
        const { isFetching, value, kind } = this.props;

        let categories = this.props.categories;
        if (kind && (kind.id == EXPENSE.id || kind.id == INCOME.id)) {
            categories = this.props.categories.filter(category => category.kind === kind.id);
        }
        
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