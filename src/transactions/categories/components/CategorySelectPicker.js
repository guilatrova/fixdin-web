import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../../../common/material/ReactSelect';

import { operations, selectors } from './../duck';

class CategorySelectPicker extends React.Component {

    static propTypes = {
        onFetch: PropTypes.func.isRequired,
        onCreate: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        value: PropTypes.number,
        kind: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.handleNewOptionClick = this.handleNewOptionClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this.props.onFetch(this.props.kind);
    }

    handleNewOptionClick(option) {
        this.props.onCreate(option.label, this.props.kind).then((response) => {
            if (response.result == 'success') {
                this.props.onChange(response.category.id);
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
            };
        });

        return (
            <Select
                creatable
                label="Categoria"
                placeholder="Selecionar..."
                options={options}
                isLoading={isFetching}
                disabled={isFetching}
                value={options.find(opt => opt.value === value)}
                autosize={false}
                onChange={this.handleOnChange}
                onNewOptionClick={this.handleNewOptionClick}
                promptTextCreator={this.promptTextCreator} />
        );
    }
}

const mapStateToProps = (state) => ({
    categories: selectors.getCategories(state),
    isFetching: selectors.isFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
    onFetch: (kind) => dispatch(operations.fetchCategories(kind)),
    onCreate: (name, kind) => dispatch(operations.saveCategory({ name, kind }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelectPicker);