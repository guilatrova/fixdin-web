import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { DataTable, DataColumn } from './../../../common/material/DataTable';
import { formatCurrencyDisplay } from '../../../utils/formatters';
import IconOptionButton from './../../../common/components/IconOptionButton';
import editIconSrc from '../../../styles/icons/editIcon.png';
import doTransferIconSrc from '../../../styles/icons/doTransferIcon.png';
import transferIconSrc from '../../../styles/icons/transfersIcon.png';
import deleteIconSrc from '../../../styles/icons/garbageIcon.png';
import { ACTIVE_STATUS } from '../status';

const AccountTable = ({ accounts, onEdit, onTransfer, onArchive, onDelete }) => {

    const formatOptions = (account) => {
        return (
            <div>

                <IconOptionButton src={editIconSrc} onClick={() => onEdit(account.id)} />

                <IconOptionButton src={doTransferIconSrc} onClick={() => onTransfer(account.id)} />

                <IconOptionButton onClick={() => onArchive(account.id)}>
                    {account.status == ACTIVE_STATUS && <ArchiveIcon /> || <UnarchiveIcon />}
                </IconOptionButton>

                <IconOptionButton src={transferIconSrc} component={Link} to={`accounts/${account.id}/transfers`} />

                <IconOptionButton onClick={() => onDelete(account.id)} src={deleteIconSrc} />

            </div>
        );
    };

    const renderBalance = (account, balanceField) => formatCurrencyDisplay(account[balanceField]);

    return (
        <DataTable data={accounts} initialOrderBy="name">
            <DataColumn sortable field="name">CONTA</DataColumn>
            <DataColumn sortable field="current_balance" onRender={renderBalance}>SALDO</DataColumn>
            <DataColumn numeric onRender={formatOptions} />
        </DataTable>
    );
};

AccountTable.propTypes = {
    accounts: PropTypes.array.isRequired,
    onTransfer: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default AccountTable;
