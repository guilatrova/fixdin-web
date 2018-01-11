import React from 'react';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';
import { withStyles } from 'material-ui/styles';

import Input from './Input';
import { Suggestion, SuggestionsContainer } from './Suggestions';

const styles = theme => ({
    container: {
        position: 'relative',
        height: 50,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        zIndex: 1
    },
    suggestion: {
        display: 'block',
        backgroundColor: 'white',
		zIndex: 1,
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        backgroundColor: 'white',
		zIndex: 1,
    },
    textField: {
        width: '100%',
    }
});

class IntegrationAutosuggest extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        suggestions: PropTypes.array.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.number,
        label: PropTypes.string
    };

    state = {
        value: '',
        suggestions: [],
    };
    
    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) });
    }
    
    handleSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    }
    
    handleChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    }

    getSuggestionValue = (suggestion) => suggestion.label;

    getSuggestions = (value) => {
        const { suggestions } = this.props; 
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        
        if (inputLength === 0)
            return [];

        return suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
            
            if (keep) {
                count += 1;
            }
            
            return keep;
        });
    }
    
    render() {
        const { classes, label } = this.props;
        
        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={Input}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestionsContainer={SuggestionsContainer}
                renderSuggestion={Suggestion}
                inputProps={{
                    label,
                    classes,
                    value: this.state.value,
                    onChange: this.handleChange
                }}
            />
        );
    }
}

export default withStyles(styles)(IntegrationAutosuggest);