import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Autocomplete from '../../../common/material/Autocomplete';
import { selectors } from '../duck';

class AccountAutocomplete extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        accounts: PropTypes.array.isRequired,
        value: PropTypes.object,
        alwaysOpen: PropTypes.bool
    }

    static defaultProps = {
        label: "Conta"
    }

    handleChange = (account) => {
        if (account) {
            this.props.onChange(account.id);
        }
    }

    render() {
        const { label, value, accounts, alwaysOpen, ...other } = this.props;
        const suggestions = accounts.map(account => ({ label: account.name, id: account.id }));

        return (
            <Autocomplete 
                label={label}
                value={value ? value.name : ""}
                onChange={this.handleChange}
                suggestions={suggestions}
                alwaysOpen={alwaysOpen}
                {...other}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: selectors.getAccounts(state)
    };
};

export default connect(mapStateToProps)(AccountAutocomplete);