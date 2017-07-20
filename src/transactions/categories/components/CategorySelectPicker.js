import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Creatable } from 'react-select';

import { fetchCategories, saveCategory } from './../actions';

class CategorySelectPicker extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewOptionClick = this.handleNewOptionClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {        
        this.props.fetch(this.props.kind);
    }

    handleNewOptionClick(option) {
        this.props.create(option.label, this.props.kind).then((response) => {
            if (response.result == 'success') {
                this.props.onChange(response.category.id)
            }
        });
    }

    handleOnChange(option) {
        const value = option ? option.value : null;
        this.props.onChange(value);
    }

    promptTextCreator(label) {
        return `Criar nova categoria "${label}"`;
    }

    render() {
        const { categories, isFetching, value, kind } = this.props;
        
        const options = categories.filter(category => category.kind == kind.id).map(category => {
            return {
                value: category.id, 
                label: category.name
            }
        })

        return (
            <Creatable
                placeholder="Escolha uma categoria..."
                options={options}
                isLoading={isFetching}
                disabled={isFetching}
                value={value}
                autosize={false}
                onChange={this.handleOnChange}
                onNewOptionClick={this.handleNewOptionClick}
                promptTextCreator={this.promptTextCreator} />
        );
    }
}

CategorySelectPicker.PropTypes = {
    kind: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (kind) => dispatch(fetchCategories(kind)),
        create: (name, kind) => dispatch(saveCategory({name, kind}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelectPicker);