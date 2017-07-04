import React, { PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';

class TransactionDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: this.props.descriptions
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterSuggestions = this.filterSuggestions.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
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

        this.filterSuggestions(value);
    }

    filterSuggestions(value) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    getSuggestions(value) {
        const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        if (escapedValue === '') {
            return this.props.descriptions;
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.props.descriptions.filter(description => regex.test(description));
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

        return (
            <Autocomplete
                getItemValue={(item) => item}
                items={this.state.suggestions}
                renderItem={this.handleRenderItem}
                renderMenu={this.handleRenderMenu}

                menuStyle={menuStyle}
                wrapperStyle={wrapperStyle}
                inputProps={inputProps}

                onSelect={this.handleSelect}
                onChange={this.handleChange}                
                value={this.props.value}
                name={this.props.name}
                maxLength={this.props.maxLength}
            />
        );
    }
}

TransactionDescription.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    descriptions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    const {transactions} = state.transactions;
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;

    return {
        descriptions: transactions.map(transaction => transaction.description).filter(onlyUnique)
    }
}

export default connect(mapStateToProps)(TransactionDescription);