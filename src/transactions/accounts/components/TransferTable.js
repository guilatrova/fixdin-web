import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import { MenuItem } from 'material-ui/Menu';

import { DataTable, DataColumn } from './../../../common/material/DataTable';
import { formatCurrencyDisplay } from '../../../utils/formatters';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';

const TransferTable = ({ transfers, accountsNames, onEdit, onDelete }) => {
    const formatOptions = (transfer) => {
        return (
            <CollapsibleMenu>
                <MenuItem onClick={() => onEdit(transfer.id)}><EditIcon /> Editar</MenuItem>
                <MenuItem onClick={() => onDelete(transfer.id)}><DeleteIcon /> Deletar</MenuItem>
            </CollapsibleMenu>
        );
    };

    const renderValue = (transfer, valueField) => formatCurrencyDisplay(transfer[valueField]);

    const renderAccount = (transfer, accountField) => accountsNames[transfer[accountField]];

    return (
        <DataTable data={transfers}>
            <DataColumn sortable field="account_from" onRender={renderAccount}>De</DataColumn>
            <DataColumn sortable field="account_to" onRender={renderAccount}>Para</DataColumn>
            <DataColumn sortable field="value" onRender={renderValue}>Valor</DataColumn>
            <DataColumn onRender={formatOptions} />
        </DataTable>
    );
};

TransferTable.propTypes = {
    transfers: PropTypes.array.isRequired,
    accountsNames: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func
};

export default TransferTable;