import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import { MenuItem } from 'material-ui/Menu';

import { TableSort, DataColumn } from './../../../common/material/TableSort';
import { formatCurrencyDisplay } from '../../../services/formatter';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';

const TransferTable = ({ transfers, accountNames, onEdit, onDelete }) => {
    const formatOptions = (transfer) => {
        return (
            <CollapsibleMenu>
                <MenuItem onClick={() => onEdit(transfer.id)}><EditIcon /> Editar</MenuItem>
                <MenuItem onClick={() => onDelete(transfer.id)}><DeleteIcon /> Deletar</MenuItem>
            </CollapsibleMenu>
        );
    };

    const renderValue = (transfer, valueField) => formatCurrencyDisplay(transfer[valueField]);

    const renderAccount = (transfer, accountField) => accountNames[transfer[accountField]];

    return (
        <TableSort data={transfers}>
            <DataColumn sortable field="account_from" onRender={renderAccount}>De</DataColumn>
            <DataColumn sortable field="account_to" onRender={renderAccount}>Para</DataColumn>
            <DataColumn sortable field="value" onRender={renderValue}>Valor</DataColumn>
            <DataColumn onRender={formatOptions} />
        </TableSort>
    );
};

TransferTable.propTypes = {
    transfers: PropTypes.array.isRequired,
    accountNames: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func
};

export default TransferTable;