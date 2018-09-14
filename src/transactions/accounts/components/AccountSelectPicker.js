import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '../../../common/material/ReactSelect';
import { selectors } from '../duck';

class AccountSelectPicker extends React.Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.number
        ]),
        placeholder: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        accounts: PropTypes.array.isRequired,
        isMulti: PropTypes.bool
    }

    static defaultProps = {
        placeholder: "Escolha suas contas"
    }

    handleOnChange = (selected) => {
        const onlyValue = opt => opt ? opt.value : undefined;
        const newValue = Array.isArray(selected) ? selected.map(onlyValue) : onlyValue(selected);
        this.props.onChange(newValue);
    };

    render() {
        // eslint-disable-next-line
        const { isFetching, value, onChange, ...props } = this.props;

        let accounts = this.props.accounts;

        const options = accounts.map(account => ({
            value: account.id,
            label: account.name
        }));

        return (
            <Select
                isLoading={isFetching}
                isDisabled={isFetching}
                options={options}
                value={value}
                onChange={this.handleOnChange}
                {...props}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: selectors.isFetching(state),
    accounts: selectors.getActiveAccounts(state)
});

export default connect(mapStateToProps)(AccountSelectPicker);
