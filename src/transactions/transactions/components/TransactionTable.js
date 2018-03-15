import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import DeleteIcon from 'material-ui-icons/Delete';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import EditIcon from 'material-ui-icons/ModeEdit';
import MoneyIcon from 'material-ui-icons/AttachMoney';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

import { 
    DescriptionFilter, 
    CategoryFilter, 
    DueDateFilter, 
    KindFilter, 
    DeadlineFilter,
    PriorityFilter,
    PaymentFilter
} from './filters';
import { sort, sortMoment } from './../../../utils/sorts';
import { DataTable, DataColumn } from './../../../common/material/DataTable';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';
import { getKind } from '../../shared/kinds';
import specifications from '../specifications';
import { formatCurrencyDisplay } from '../../../utils/formatters';

const styles = {
    cell: {
        whiteSpace: 'nowrap'
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

    render () {
        const { activeFilters, classes } = this.props;
        return (
            <DataTable 
                cellsClassName={classes.cell}
                data={this.props.transactions} 
                initialOrderBy="due_date" >

                <DataColumn 
                    sortable
                    padding="none"
                    field="kind" 
                    onRender={this.formatKind}
                    onRenderFilter={<KindFilter />} 
                    filterActive={activeFilters.kind} > TIPO
                </DataColumn>

                <DataColumn 
                    sortable
                    padding="none"
                    field="account" 
                    onRender={this.formatAccount} 
                    onSort={this.sortAccount} > CONTA
                </DataColumn>
                
                <DataColumn 
                    sortable
                    padding="none"
                    field="due_date" 
                    onRender={this.formatDate}
                    onRenderFilter={<DueDateFilter />} 
                    filterActive={activeFilters.due_date} > DATA
                </DataColumn>

                <DataColumn 
                    sortable
                    padding="none"
                    field="description" 
                    onRenderFilter={<DescriptionFilter />} 
                    filterActive={activeFilters.description} > DESCRIÇÃO
                </DataColumn>

                <DataColumn 
                    sortable
                    padding="none"
                    field="category"
                    filterActive={activeFilters.category} 
                    onRender={this.formatCategory}
                    onRenderFilter={<CategoryFilter />}
                    onSort={this.sortCategory}> CATEGORIA
                </DataColumn>

                <DataColumn
                    sortable                    
                    padding="none"
                    field="value" 
                    cellClassName={classes.strongCell}
                    onRender={this.formatValue}
                    onSort={this.sortValue}> VALOR
                </DataColumn>

                <DataColumn sortable padding="none" field="priority" onRenderFilter={<PriorityFilter />} filterActive={activeFilters.priority}>IMP.</DataColumn>
                <DataColumn sortable padding="none" field="deadline" onRenderFilter={<DeadlineFilter />} filterActive={activeFilters.deadline}>TOL.</DataColumn>

                <DataColumn 
                    sortable 
                    padding="none" 
                    field="payment_date" 
                    onRenderFilter={<PaymentFilter />} 
                    filterActive={activeFilters.payment_date} 
                    onRender={this.formatPayed}
                    onSort={this.sortPayed}> PG.
                </DataColumn>

                <DataColumn padding="none" onRender={this.formatOptions}>EDIT.</DataColumn>
            </DataTable>
        );
    }
}

export default withStyles(styles)(TransactionTable);