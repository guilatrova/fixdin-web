import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

import { selectors } from '../duck';
import AccountTable from '../components/AccountTable';
import ActionableTableWrapper from '../../../common/components/ActionableTableWrapper';

const ACTIVE_TAB = 0;
// const ARCHIVED_TAB = 1;
// const ALL_TAB = 2;

class AccountTableContainer extends React.Component {
    static propTypes = {
        ...AccountTable.propTypes,
        onAdd: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
    }

    state = {
        tab: ACTIVE_TAB
    }

    handleTabChange = (e, value) => this.setState({ tab: value });

    render() {
        const { onAdd, onRefresh, ...props } = this.props;
        const { tab } = this.state;

        const actions = [
            { onClick: onAdd, icon: <AddIcon /> },
            { onClick: () => { alert("undone"); onRefresh(); }, icon: <RefreshIcon /> }
        ];

        return (
            <ActionableTableWrapper
                selectedTab={tab}
                onTabChange={this.handleTabChange}
                tabs={["Ativas", "Arquivadas", "Todas"]}
                title="RELAÇÃO DE CONTAS"
                actions={actions}
            >

                <AccountTable {...props} />

            </ActionableTableWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    accounts: selectors.getAccounts(state)
});

export default connect(mapStateToProps)(AccountTableContainer);
