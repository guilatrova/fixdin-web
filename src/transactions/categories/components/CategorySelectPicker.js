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

    componentDidMount() {
        this.props.onFetch(this.props.kind);
    }

    handleOnCreateOption = (name) => {
        this.props.onCreate(name, this.props.kind).then((response) => {
            if (response.result == 'success') {
                this.props.onChange(response.category.id);
            }
        });
    }

    handleOnChange = (option) => {
        const value = option ? option.value : null;
        this.props.onChange(value);
    }

    formatCreateLabel = (label) => `Criar nova categoria "${label}"`;

    render() {
        const { categories, isFetching, value, kind } = this.props;

        const options = categories.filter(category => category.kind == kind.id).map(category => ({
            value: category.id,
            label: category.name
        }));

        return (
            <Select creatable
                label="Categoria"
                placeholder="Selecionar..."
                options={options}
                value={value}
                isLoading={isFetching}
                disabled={isFetching}
                onChange={this.handleOnChange}
                onCreateOption={this.handleOnCreateOption}
                formatCreateLabel={this.formatCreateLabel} />
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
