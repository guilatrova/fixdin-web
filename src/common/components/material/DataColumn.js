import React from 'react';
import PropTypes from 'prop-types';

function defaultOnRender(row, field) {
    return row[field];
}

function defaultOnSort(a, b, order) {
    if (typeof a === 'string' || a instanceof String && typeof b === 'string' || b instanceof String) {
        a = a.toUpperCase();
        b = b.toUpperCase();
    }

    if (order === 'desc') 
        return b > a;
    
    return a > b;
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