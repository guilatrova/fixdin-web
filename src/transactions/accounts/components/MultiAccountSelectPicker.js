import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select'; //TODO: Change it to Autocomplete support

import { selectors } from'../duck';

class MultiAccountSelectPicker extends React.Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        value: PropTypes.array,
        onChange: PropTypes.func.isRequired,
        accounts: PropTypes.array.isRequired,
    }

    handleOnChange = (options) => this.props.onChange(options.map(opt => opt.value));

    render() {
        const { isFetching, value } = this.props;

        let accounts = this.props.accounts;
        
        const options = accounts.map(account => ({
            value: account.id, 
            label: account.name
        }));

        return (
            <Select multi
                placeholder="Escolha suas contas"
                options={options}
                isLoading={isFetching}
                disabled={isFetching}
                autosize={false}
                value={value}
                onChange={this.handleOnChange}/>
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: selectors.isFetching(state),
    accounts: selectors.getAccounts(state)
});

export default connect(mapStateToProps)(MultiAccountSelectPicker);