import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors, operations } from '../duck';
import TransferTable from '../components/TransferTable';

class TransferPage extends React.Component {
    static propTypes = {
        accountId: PropTypes.number.isRequired,
        accountNames: PropTypes.array.isRequired,
        transfers: PropTypes.array.isRequired,
        onFetch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { onFetch, accountId } = this.props;
        onFetch(accountId);
    }

    render() {
        const { transfers, accountNames } = this.props;

        return (
            <div>
                <TransferTable 
                    transfers={transfers}
                    accountNames={accountNames}
                    onEdit={() => {}}
                    onDelete={() => {}} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const accountId = parseInt(ownProps.match.params.accountId);
    return {
        accountId,
        transfers: selectors.getTransfersOfAccount(state, accountId),
        accountNames: selectors.getAccountsNamesMappedById(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: (accountId, timeout) => {
            dispatch(operations.fetchAccounts(timeout));
            dispatch(operations.fetchTransfers(accountId, timeout));
        }
    };
};

//TODO transfers:
// 404 if not found

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);