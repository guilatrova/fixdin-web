import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { DataTable, DataColumn } from './../../../common/material/DataTable';
import { formatCurrencyDisplay } from '../../../utils/formatters';
import editIconSrc from '../../../styles/icons/editIcon.png';
import doTransferIconSrc from '../../../styles/icons/doTransferIcon.png';
import transferIconSrc from '../../../styles/icons/transfersIcon.png';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    optionIcon: {
        maxWidth: 15,
        maxHeight: 15
    }
});

const AccountTable = ({ classes, accounts, onEdit, onTransfer }) => {

    // eslint-disable-next-line react/prop-types
    const OptionButton = ({ icon, children, ...props }) => (
        <Button className={classes.button} {...props}>
            <img src={icon} className={cn(classes.leftIcon, classes.optionIcon)} />
            {children}
        </Button>
    );

    const formatOptions = (account) => {
        return (
            <div>

                <OptionButton icon={editIconSrc} onClick={() => onEdit(account.id)}>
                    Editar
                </OptionButton>

                <OptionButton icon={doTransferIconSrc} onClick={() => onTransfer(account.id)}>
                    Transferir
                </OptionButton>

                <Button component={Link} to={`accounts/${account.id}/transfers`}>
                    <img src={transferIconSrc} className={cn(classes.leftIcon, classes.optionIcon)} />
                    Transferências
                </Button>

            </div>
        );
    };

    const renderBalance = (account, balanceField) => formatCurrencyDisplay(account[balanceField]);

    return (
        <DataTable data={accounts} initialOrderBy="name">
            <DataColumn sortable field="name">NOME</DataColumn>
            <DataColumn sortable field="current_balance" onRender={renderBalance}>SALDO</DataColumn>
            <DataColumn numeric onRender={formatOptions} />
        </DataTable>
    );
};

AccountTable.propTypes = {
    accounts: PropTypes.array.isRequired,
    onTransfer: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDisable: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountTable);
