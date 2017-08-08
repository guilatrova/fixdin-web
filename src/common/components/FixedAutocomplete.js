import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

class FixedAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            source: props.source.filter(onlyUnique)
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            source: nextProps.source.filter(onlyUnique)
        })
    }

    handleSelect(value) {
        this.props.onChange({
            target: {
                name: this.props.name,
                value
            }
        });
    }

    handleChange(e) {
        const {value} = e.target;

        this.props.onChange({
            target: {
                value,
                name: this.props.name
            }
        });        
    }

    getSuggestions(value) {
        if (!value) {
            return this.state.source;
        }            
                
        const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        if (escapedValue === '') {            
            return this.state.source;
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.state.source.filter(description => regex.test(description));
    }

    handleRenderMenu(items, value, style) {
        style = {
            ...style,
            left: undefined,
            top: undefined
        }
        return <div style={{ ...style, ...this.menuStyle }} children={items}/>
    }

    handleRenderItem(item, isHighlighted) {
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item}
            </div>
        );
    }

    render() {
        const menuStyle = {
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            position: 'fixed',
            overflow: 'auto',
            maxHeight: '50%',
            zIndex: 99
        };

        const wrapperStyle = {
            display: 'block'
        };

        const inputProps = {
            className: 'form-control'
        };

        const suggestions = this.getSuggestions(this.props.value);

        return (
            <Autocomplete
                getItemValue={(item) => item}
                items={suggestions}
                renderItem={this.handleRenderItem}

                menuStyle={menuStyle}
                wrapperStyle={wrapperStyle}
                inputProps={inputProps}

                onSelect={this.handleSelect}
                onChange={this.handleChange}                
                value={this.props.value}
                name={this.props.name}
            />
        );
    }
}

FixedAutocomplete.PropTypes = {
    source: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string
}

export default FixedAutocomplete;