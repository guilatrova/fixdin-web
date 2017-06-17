import React, { PropTypes } from 'react';
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
        const { categories, isFetching, value, onChange, kind } = this.props;
        
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
                onChange={onChange}
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