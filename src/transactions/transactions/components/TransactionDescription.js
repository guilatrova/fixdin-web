import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from '../../transactions/duck';
import Autocomplete from '../../../common/material/Autocomplete';

const TransactionDescription = ({ label, onChange, onlyVisible, descriptions, visibleDescriptions, ...props }) => {    
    const suggestions = onlyVisible ? visibleDescriptions : descriptions;
    const mappedSuggestions = suggestions.map(description => ({ label: description, value: description }));

    return (
        <Autocomplete
            label={label}
            onChange={(suggestion) => onChange(suggestion ? suggestion.label : "")}
            alwaysRenderSuggestions={false}
            allowInvalid={true}
            suggestions={mappedSuggestions}
            maxLength="120"
            {...props}
        />
    );
};

TransactionDescription.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onlyVisible: PropTypes.bool,
    descriptions: PropTypes.array.isRequired,
    visibleDescriptions: PropTypes.array.isRequired
};

TransactionDescription.defaultProps = {
    onlyVisible: false,
    label: "Descrição"
};

const mapStateToProps = (state) => {
    return {
        descriptions: selectors.getAllTransactionDescriptions(state),
        visibleDescriptions: selectors.getVisibleTransactionDescriptions(state),
    };
};

export default connect(mapStateToProps)(TransactionDescription);