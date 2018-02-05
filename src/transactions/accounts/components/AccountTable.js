import React from 'react';
import PropTypes from 'prop-types';

import EditIcon from 'material-ui-icons/ModeEdit';
import TransferIcon from 'material-ui-icons/CompareArrows';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';

import { TableSort, DataColumn } from './../../../common/material/TableSort';
import { formatCurrencyDisplay } from '../../../services/formatter';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';

const AccountTable = ({ accounts, onEdit, onTransfer }) => {
    const formatOptions = (account) => {
        return (
            <div>
                <Link to={`accounts/${account.id}/transfers`}>Transferências</Link>

                <CollapsibleMenu>
                    <MenuItem onClick={() => onTransfer(account)}><TransferIcon /> Transferir</MenuItem>
                    <MenuItem onClick={() => onEdit(account.id)}><EditIcon /> Editar</MenuItem>                    
                </CollapsibleMenu>
            </div>
        );
    };

    const renderBalance = (account, balanceField) => formatCurrencyDisplay(account[balanceField]);

    return (
        <TableSort data={accounts} initialOrderBy="name">
            <DataColumn sortable field="name">Nome</DataColumn>
            <DataColumn sortable field="current_balance" onRender={renderBalance}>Saldo</DataColumn>
            <DataColumn onRender={formatOptions} />
        </TableSort>
    );
};

AccountTable.propTypes = {
    accounts: PropTypes.array.isRequired,
    onTransfer: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDisable: PropTypes.func
};

export default AccountTable;