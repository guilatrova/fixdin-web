import React from 'react';
import PropTypes from 'prop-types';

import { DataTable, DataColumn } from './../../../common/material/DataTable';
import { formatCurrencyDisplay } from '../../../utils/formatters';

import editIconSrc from '../../../styles/icons/editIcon.png';
import deleteIconSrc from '../../../styles/icons/garbageIcon.png';
import IconOptionButton from '../../../common/components/IconOptionButton';

const TransferTable = ({ transfers, accountsNames, onEdit, onDelete }) => {
    const formatOptions = (transfer) => {
        return (
            <div>
                <IconOptionButton onClick={() => onEdit(transfer.id)} src={editIconSrc} />
                <IconOptionButton onClick={() => onDelete(transfer.id)} src={deleteIconSrc} />
            </div>
        );
    };

    const renderValue = (transfer, valueField) => formatCurrencyDisplay(transfer[valueField]);

    const renderAccount = (transfer, accountField) => accountsNames[transfer[accountField]];

    return (
        <DataTable data={transfers}>
            <DataColumn sortable field="account_from" onRender={renderAccount}>DE</DataColumn>
            <DataColumn sortable field="account_to" onRender={renderAccount}>PARA</DataColumn>
            <DataColumn sortable field="value" onRender={renderValue}>VALOR</DataColumn>
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