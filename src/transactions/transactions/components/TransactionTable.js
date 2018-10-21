import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';

import {
    DescriptionFilter,
    CategoryFilter,
    DueDateFilter,
    DeadlineFilter,
    PriorityFilter,
    PaymentFilter,
    AccountFilter
} from './filters';
import { sort, sortMoment } from './../../../utils/sorts';
import { DataTable, DataColumn } from './../../../common/material/DataTable';
import AccountAvatar from '../../accounts/components/AccountAvatar';
import IconOptionButton from './../../../common/components/IconOptionButton';
import { getKind } from '../../shared/kinds';
import specifications from '../specifications';
import { formatCurrencyDisplay } from '../../../utils/formatters';
import AddButtonTableSuffix from './AddButtonTableSuffix';
import filterIconSrc from '../../../styles/icons/filterTableIcon.png';
import editIconSrc from '../../../styles/icons/editIcon.png';
import copyIconSrc from '../../../styles/icons/copyIcon.png';
import deleteIconSrc from '../../../styles/icons/garbageIcon.png';

const INDICATOR_WEIGHT = "6px";

const styles = {
    payedIndicator: {
        borderLeft: `${INDICATOR_WEIGHT} solid ${purple['500']}`
    },
    overdueIndicator: {
        borderLeft: `${INDICATOR_WEIGHT} solid ${blue['300']}`
    },
    cell: {
        whiteSpace: 'nowrap',
    },
    greenColor: {
        color: green['A700'],
    },
    redColor: {
        color: red['A700'],
    },
    strongCell: {
        fontWeight: 'bold',
    },
    centered: {
        textAlign: "center"
    },
    filterIcon: {
        maxWidth: 30,
        maxHeight: 30,
        marginRight: 5
    }
};

class TransactionTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        categoriesNames: PropTypes.array.isRequired,
        accounts: PropTypes.array,
        onEdit: PropTypes.func.isRequired,
        onPay: PropTypes.func.isRequired,
        onCopy: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onAddAccount: PropTypes.func.isRequired,
        onAddCategory: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        activeFilters: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    }

    getAccount = (id) => this.props.accounts.find(acc => acc.id == id);

    //Format
    formatAccount = (row, field) => {
        const account = this.getAccount(row[field]);
        if (account) {
            return <AccountAvatar account={this.getAccount(row[field])} />;
        }

        return row[field];
    }

    formatCategory = (row, field) => this.props.categoriesNames[row[field]];

    formatDate = (row, field) => row[field].format('DD/MM/YY');

    formatValue = (row, field) => formatCurrencyDisplay(row[field]);

    formatPayed = (row, field) => {
        const { onPay, isFetching } = this.props;
        const cell = !!row[field];
        return <Checkbox color="primary" checked={cell} onClick={() => onPay(row.id)} disabled={isFetching} />;
    }

    formatOptions = (transaction) => {
        if (specifications.isTransfer(transaction))
            return null;

        const { onEdit, onDelete, onCopy } = this.props;
        const wrapFuncWithTransaction = func => () => func(transaction.id);

        return (
            <div>
                <IconOptionButton onClick={wrapFuncWithTransaction(onEdit)} src={editIconSrc} />
                <IconOptionButton onClick={wrapFuncWithTransaction(onCopy)} src={copyIconSrc} />
                <IconOptionButton onClick={wrapFuncWithTransaction(onDelete)} src={deleteIconSrc} />
            </div>
        );
    }

    formatKind = (transaction) => {
        const className = transaction.kind ? "greenColor" : "redColor";
        return <span className={this.props.classes[className]}>{getKind(transaction.kind).text[0].toUpperCase()}</span>;
    }

    formatRowIndicator = (transaction) => {
        const { classes } = this.props;
        if (transaction.payment_date) {
            return classes.payedIndicator;
        }

        if (specifications.isOverdue(transaction)) {
            return classes.overdueIndicator;
        }
    }

    //Sort
    sortValue = (a, b, order) => {
        let valueA = Number(a);
        let valueB = Number(b);

        if (valueA < 0)
            valueA = -valueA;

        if (valueB < 0)
            valueB = -valueB;

        if (order === 'asc')
            return valueA - valueB;

        return valueB - valueA;
    }

    sortAccount = (a, b, order) => {
        const aName = this.getAccount(a).name;
        const bName = this.getAccount(b).name;
        return sort(aName, bName, order);
    }

    sortCategory = (a, b, order) => {
        const { categoriesNames } = this.props;
        return sort(categoriesNames[a], categoriesNames[b], order);
    }

    sortPayed = (a, b, order) => sortMoment(a, b, order);

    render() {
        const { activeFilters, classes, onAddAccount, onAddCategory } = this.props;
        return (
            <DataTable
                headersClassName={classes.strongCell}
                cellsClassName={classes.cell}
                data={this.props.transactions}
                filterIcon={<img src={filterIconSrc} className={classes.filterIcon} />}
                initialOrderBy="due_date" >

                <DataColumn
                    sortable
                    padding="dense"
                    field="account"
                    onRender={this.formatAccount}
                    filterComponent={AccountFilter}
                    filterActive={activeFilters.account}
                    cellClassName={this.formatRowIndicator}
                    headerSuffix={<AddButtonTableSuffix onClick={onAddAccount} />}
                    onSort={this.sortAccount} > CONTA
                </DataColumn>

                <DataColumn
                    sortable
                    padding="dense"
                    field="due_date"
                    onRender={this.formatDate}
                    filterComponent={DueDateFilter}
                    filterActive={activeFilters.due_date} > DATA
                </DataColumn>

                <DataColumn
                    sortable
                    padding="dense"
                    field="description"
                    filterComponent={DescriptionFilter}
                    filterActive={activeFilters.description} > DESCRIÇÃO
                </DataColumn>

                <DataColumn
                    sortable
                    padding="dense"
                    field="category"
                    filterActive={activeFilters.category}
                    onRender={this.formatCategory}
                    filterComponent={CategoryFilter}
                    headerSuffix={<AddButtonTableSuffix onClick={onAddCategory} />}
                    onSort={this.sortCategory}> CATEGORIA
                </DataColumn>

                <DataColumn
                    sortable
                    numeric
                    padding="dense"
                    field="value"
                    onRender={this.formatValue}
                    onSort={this.sortValue}> VALOR
                </DataColumn>

                <DataColumn
                    sortable
                    numeric
                    padding="none"
                    field="priority"
                    filterComponent={PriorityFilter}
                    filterActive={activeFilters.priority}
                    cellClassName={classes.centered} > IMP.
                </DataColumn>

                <DataColumn
                    sortable
                    numeric
                    padding="none"
                    field="deadline"
                    filterComponent={DeadlineFilter}
                    filterActive={activeFilters.deadline}
                    cellClassName={classes.centered} > TOL.
                </DataColumn>

                <DataColumn padding="none" onRender={this.formatOptions}>EDITAR</DataColumn>

                <DataColumn
                    sortable
                    padding="none"
                    field="payment_date"
                    cellClassName={classes.centered}
                    filterComponent={PaymentFilter}
                    filterActive={activeFilters.payment_date}
                    onRender={this.formatPayed}
                    onSort={this.sortPayed}> STATUS
                </DataColumn>

            </DataTable>
        );
    }
}

export default withStyles(styles)(TransactionTable);
