import React from 'react';
import { connect } from 'react-redux';
import { Creatable } from 'react-select';

import { fetchCategories, saveCategory } from './../actions';

class CategorySelectPicker extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewOptionClick = this.handleNewOptionClick.bind(this);
    }

    componentDidMount() {        
        this.props.fetch(this.props.kind);
    }

    handleNewOptionClick(option) {
        this.props.create(option.label, this.props.kind);
    }

    promptTextCreator(label) {
        return `Criar nova categoria "${label}"`;
    }

    render() {
        const options = this.props.categories.map((category) => {
            return {
                value: category.id, 
                label: category.name
            }
        })

        return (
            <Creatable 
                options={options}
                isLoading={this.props.isFetching}
                disabled={this.props.isFetching}
                value={this.props.value}
                onChange={this.props.onChange}
                onNewOptionClick={this.handleNewOptionClick}
                placeholder="Escolha uma categoria..."
                promptTextCreator={this.promptTextCreator} />
        );
    }
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