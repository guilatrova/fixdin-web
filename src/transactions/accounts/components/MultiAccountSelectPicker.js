import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '../../../common/material/ReactSelect';
import { selectors } from '../duck';

class MultiAccountSelectPicker extends React.Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.number
        ]),
        onChange: PropTypes.func.isRequired,
        accounts: PropTypes.array.isRequired,
        isMulti: PropTypes.bool
    }

    handleOnChange = (selected) => {
        const onlyValue = opt => opt ? opt.value : undefined;
        this.props.onChange(Array.isArray(selected) ? selected.map(onlyValue) : onlyValue(selected));
    };

    render() {
        const { isFetching, value, isMulti } = this.props;

        let accounts = this.props.accounts;

        const options = accounts.map(account => ({
            value: account.id,
            label: account.name
        }));

        return (
            <Select
                isMulti={isMulti}
                isLoading={isFetching}
                isDisabled={isFetching}
                placeholder="Escolha suas contas"
                options={options}
                value={value}
                onChange={this.handleOnChange} />
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: selectors.isFetching(state),
    accounts: selectors.getAccounts(state)
});

export default connect(mapStateToProps)(MultiAccountSelectPicker);
