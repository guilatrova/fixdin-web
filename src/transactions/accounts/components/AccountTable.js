import React from 'react';
import PropTypes from 'prop-types';

import TableSort from './../../../common/material/TableSort';
import DataColumn from './../../../common/material/DataColumn';
import { formatCurrencyDisplay } from '../../../services/formatter';

const AccountTable = ({ accounts }) => {
    const renderBalance = (account, balanceField) => formatCurrencyDisplay(account[balanceField]);

    return (
        <TableSort data={accounts} initialOrderBy="name">
            <DataColumn sortable field="name">Nome</DataColumn>
            <DataColumn sortable field="current_balance" onRender={renderBalance}>Saldo</DataColumn>
        </TableSort>
    );
};

AccountTable.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountTable;