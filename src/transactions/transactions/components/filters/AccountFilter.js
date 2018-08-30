import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, operations } from '../../duck';
import AccountSelectPicker from './../../../accounts/components/AccountSelectPicker';
import FilterWrapper from './FilterWrapper';

class AccountFilter extends React.Component {
    static propTypes = {
        account: PropTypes.array.isRequired, //Although name is "account", actually it's an array of selected
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        account: []
    };

    constructor(props) {
        super(props);

        this.state = {
            account: props.account
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ account: nextProps.account });
    }

    handleSubmit = () => this.props.onSubmit(this.state.account);

    handleClear = () => this.props.onSubmit([]);

    render() {
        return (
            <FilterWrapper onSubmit={this.handleSubmit} onClear={this.handleClear}>
                <AccountSelectPicker
                    isMulti
                    value={this.state.account}
                    onChange={(account) => this.setState({ account })} />
            </FilterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    account: selectors.getFilters(state).account || []
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (account) => {
        dispatch(operations.setFilters({ account }, true));
        dispatch(operations.filterTransactions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountFilter);
