import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import EditIcon from '@material-ui/icons/ModeEdit';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

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
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';
import { getKind } from '../../shared/kinds';
import specifications from '../specifications';
import { formatCurrencyDisplay } from '../../../utils/formatters';
import AddButtonTableSuffix from './AddButtonTableSuffix';
import filterIconSrc from '../../../styles/icons/filterTableIcon.png';

const styles = {
    cell: {
        whiteSpace: 'nowrap',
    },
    optionsWrapper: {
        display: 'flex',
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
    padLeft: {
        paddingLeft: '20px'
    },
    filterIcon: {
        maxWidth: 30,
        marginRight: 5
    }
};

class TransactionTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        categoriesNames: PropTypes.array.isRequired,
        accountsNames: PropTypes.array.isRequired,
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

    //Format
    formatAccount = (row, field) => this.props.accountsNames[row[field]];

    formatCategory = (row, field) => this.props.categoriesNames[row[field]];

    formatDate = (row, field) => row[field].format('DD/MM/YY');

    formatValue = (row, field) => formatCurrencyDisplay(row[field]);

    formatPayed = (row, field) => {
        const cell = row[field];
        const className = cell ? "greenColor" : "redColor";
        return <span className={this.props.classes[className]}>$</span>;
    }

    formatOptions = (transaction) => {
        const { onEdit, onDelete, onCopy, onPay, isFetching, classes } = this.props;
        if (specifications.isTransfer(transaction))
            return null;

        return (
            <div className={classes.optionsWrapper}>
                <MenuItem onClick={() => onPay(transaction.id)} disabled={isFetching}><MoneyIcon /></MenuItem>

                <CollapsibleMenu>
                    <MenuItem onClick={() => onEdit(transaction.id)}><EditIcon /> Editar</MenuItem>
                    <MenuItem onClick={() => onCopy(transaction.id)}><ContentCopyIcon /> Copiar</MenuItem>
                    <MenuItem onClick={() => onDelete(transaction.id)}><DeleteIcon /> Deletar</MenuItem>
                </CollapsibleMenu>

                <Checkbox color="primary" />
            </div>
        );
    }

    formatKind = (transaction) => {
        const className = transaction.kind ? "greenColor" : "redColor";
        return <span className={this.props.classes[className]}>{getKind(transaction.kind).text[0].toUpperCase()}</span>;
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
        const { accountsNames } = this.props;
        return sort(accountsNames[a], accountsNames[b], order);
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
                    onRenderFilter={<AccountFilter />}
                    filterActive={activeFilters.account}
                    headerSuffix={<AddButtonTableSuffix onClick={onAddAccount} />}
                    onSort={this.sortAccount} > CONTA
                </DataColumn>

                <DataColumn
                    sortable
                    padding="dense"
                    field="due_date"
                    onRender={this.formatDate}
                    onRenderFilter={<DueDateFilter />}
                    filterActive={activeFilters.due_date} > DATA
                </DataColumn>

                <DataColumn
                    sortable
                    padding="dense"
                    field="description"
                    onRenderFilter={<DescriptionFilter />}
                    filterActive={activeFilters.description} > DESCRIÇÃO
                </DataColumn>

                <DataColumn
                    sortable
                    padding="dense"
                    field="category"
                    filterActive={activeFilters.category}
                    onRender={this.formatCategory}
                    onRenderFilter={<CategoryFilter />}
                    headerSuffix={<AddButtonTableSuffix onClick={onAddCategory} />}
                    onSort={this.sortCategory}> CATEGORIA
                </DataColumn>

                <DataColumn
                    sortable
                    numeric
                    padding="dense"
                    field="value"
                    cellClassName={classes.strongCell}
                    onRender={this.formatValue}
                    onSort={this.sortValue}> VALOR
                </DataColumn>

                <DataColumn
                    sortable
                    padding="none"
                    field="priority"
                    onRenderFilter={<PriorityFilter />}
                    filterActive={activeFilters.priority}
                    cellClassName={classes.padLeft} > IMP.
                </DataColumn>

                <DataColumn
                    sortable
                    padding="none"
                    field="deadline"
                    onRenderFilter={<DeadlineFilter />}
                    filterActive={activeFilters.deadline}
                    cellClassName={classes.padLeft} > TOL.
                </DataColumn>

                <DataColumn padding="none" onRender={this.formatOptions}>EDITAR</DataColumn>

                <DataColumn
                    sortable
                    padding="none"
                    field="payment_date"
                    cellClassName={classes.strongCell}
                    onRenderFilter={<PaymentFilter />}
                    filterActive={activeFilters.payment_date}
                    onRender={this.formatPayed}
                    onSort={this.sortPayed}> STATUS
                </DataColumn>

            </DataTable>
        );
    }
}

export default withStyles(styles)(TransactionTable);