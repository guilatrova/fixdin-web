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
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number,
        label: PropTypes.string,
        alwaysRenderSuggestions: PropTypes.bool.isRequired,
        allowInvalid: PropTypes.bool.isRequired
    };

    static defaultProps = {
        alwaysRenderSuggestions: true,
        allowInvalid: false
    }

    constructor(props) {
        super(props);

        let value = "";
        if (props.value) {
            value = props.suggestions.find(s => s.id == props.value).label;
        }

        this.state = {
            value,
            suggestions: this.getSuggestions(value),
        };
    }    
    
    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) });
    }
    
    handleSuggestionsClearRequested = () => {
        const { suggestions, alwaysRenderSuggestions } = this.props; 
        this.setState({ suggestions: alwaysRenderSuggestions ? suggestions : [] });
    }
    
    handleChange = (event, { newValue }) => {
        this.setState({ value: newValue });
        
        const { onChange, suggestions, allowInvalid } = this.props;
        
        if (allowInvalid) {
            onChange({ label: newValue });
        }
        else {
            const suggestion = suggestions.find(s => s.label === newValue);
            onChange(suggestion);
        }
    }

    onBlur = () => {
        const { value } = this.state;
        const { suggestions, allowInvalid } = this.props;

        if (!allowInvalid) {
            const valid = suggestions.find(s => s.label === value);
            if (!valid) {
                this.setState({ value: "" });
            }
        }
    }

    getSuggestionLabel = (suggestion) => suggestion.label;

    getSuggestions = (value) => {
        const { suggestions, alwaysRenderSuggestions } = this.props; 
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        
        if (inputLength === 0)
            return alwaysRenderSuggestions ? suggestions : [];

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
        const { classes, label, onChange, alwaysRenderSuggestions } = this.props;
        
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
                getSuggestionValue={this.getSuggestionLabel}
                renderSuggestionsContainer={SuggestionsContainer}
                renderSuggestion={Suggestion}
                onSuggestionSelected={(e, suggestion) => onChange(suggestion.suggestion)}
                alwaysRenderSuggestions={alwaysRenderSuggestions && this.state.value == ""}
                inputProps={{
                    label,
                    classes,
                    onBlur: this.onBlur,
                    value: this.state.value,
                    onChange: this.handleChange
                }}
            />
        );
    }
}

export default withStyles(styles)(IntegrationAutosuggest);