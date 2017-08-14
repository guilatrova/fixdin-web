import React from 'react';
import PropTypes from 'prop-types';
import { sort as defaultOnSort } from './../../sorts';

function defaultOnRender(row, field) {
    return row[field];
}

export default class DataColumn extends React.Component {
    static propTypes = {
        children: PropTypes.string,
        field: PropTypes.string,
        onRender: PropTypes.func.isRequired,

        sortable: PropTypes.bool.isRequired,
        onSort: PropTypes.func.isRequired
    };

    static defaultProps = {
        sortable: false,
        onRender: defaultOnRender,
        onSort: defaultOnSort
    }
    
    render () {
        return null;
    }
}