import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import { MenuItem } from 'material-ui/Menu';

import { TableSort, DataColumn } from './../../../common/material/TableSort';
import { formatCurrencyDisplay } from '../../../services/formatter';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';


const AccountTable = ({ accounts, onEdit, onDisable }) => {
    const formatOptions = (account) => {
        return (
            <CollapsibleMenu>
                <MenuItem onClick={() => onEdit(account.id)}><EditIcon /> Editar</MenuItem>
                <MenuItem onClick={() => onDisable(account.id)}><DeleteIcon /> Desativar</MenuItem>
            </CollapsibleMenu>
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
    onEdit: PropTypes.func.isRequired,
    onDisable: PropTypes.func
};

export default AccountTable;