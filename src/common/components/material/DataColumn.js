import React from 'react';
import PropTypes from 'prop-types';

function defaultOnRender(row, field) {
    return row[field];
}

function isNumeric(a) {
    return !isNaN(a);
}

function isString(a) {
    return (typeof a === 'string' || a instanceof String);
}

function defaultOnSort(a, b, order) {
    if(isNumeric(a) && isNumeric(b)) {
        if (order === 'asc')
            return a - b;
        return b - a;
    }
    
    if (isNumeric(a)) {
        return (order === 'asc' ? -1 : 1);
    }
    
    if (isNumeric(b)) {
        return (order === 'asc' ? 1 : -1);
    }    

    a = a.toUpperCase();
    b = b.toUpperCase();

    if (order === 'desc')
        return (b > a) ? -1 : 1;
    
    return (a > b) ? 1 : -1;
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