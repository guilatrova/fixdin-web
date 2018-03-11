import React from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from 'material-ui/Menu';

import DeleteIcon from 'material-ui-icons/Delete';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import EditIcon from 'material-ui-icons/ModeEdit';
import MoneyIcon from 'material-ui-icons/AttachMoney';

import { 
    DescriptionFilter, 
    CategoryFilter, 
    DueDateFilter, 
    KindFilter, 
    DeadlineFilter,
    PriorityFilter,
    PaymentFilter
} from './filters';
import { sort } from './../../../utils/sorts';
import { TableSort, DataColumn } from './../../../common/material/TableSort';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';
import { getKind } from '../../shared/kinds';
import specifications from '../specifications';

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
        activeFilters: PropTypes.object.isRequired
    }

    //Format
    formatAccount = (row, field) => this.props.accountsNames[row[field]];

    formatCategory = (row, field) => this.props.categoriesNames[row[field]];

    formatDate = (row, field) => {
        const cell = row[field];
        return cell ? cell.format('DD/MM/YYYY') : 'NÃO PAGO';
    }

    formatValue = (row, field) => {
        const cell = row[field];
        let positiveValue = cell.toFixed(2).toString().replace(".", ",");
        if (positiveValue[0] == '-') {
            positiveValue = positiveValue.substring(1);
        }
        return `R$ ${positiveValue}`;
    }

    formatOptions = (transaction) => {
        const { onEdit, onDelete, onCopy, onPay, isFetching } = this.props;
        const pendingPayment = !transaction.payment_date;
        if (specifications.isTransfer(transaction))
            return null;

        return (
            <div>
                {pendingPayment && <div className="col-xs-6">
                    <MenuItem onClick={() => onPay(transaction.id)} disabled={isFetching}><MoneyIcon /></MenuItem>
                </div>}
                <div className="col-xs-6 pull-right">
                    <CollapsibleMenu>
                        <MenuItem onClick={() => onEdit(transaction.id)}><EditIcon /> Editar</MenuItem>
                        <MenuItem onClick={() => onCopy(transaction.id)}><ContentCopyIcon /> Copiar</MenuItem>
                        <MenuItem onClick={() => onDelete(transaction.id)}><DeleteIcon /> Deletar</MenuItem>
                    </CollapsibleMenu>
                </div>
            </div>
        );
    }

    formatKind = (transaction) => getKind(transaction.kind).text;

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

    render () {
        const { activeFilters } = this.props;
        return (
            <TableSort data={this.props.transactions} initialOrderBy="due_date">

                <DataColumn 
                    sortable 
                    field="kind" 
                    onRender={this.formatKind}
                    onRenderFilter={<KindFilter />} 
                    filterActive={activeFilters.kind} > Tipo
                </DataColumn>

                <DataColumn 
                    sortable 
                    field="account" 
                    onRender={this.formatAccount} 
                    onSort={this.sortAccount} > Conta
                </DataColumn>
                
                <DataColumn 
                    sortable 
                    field="due_date" 
                    onRender={this.formatDate}
                    onRenderFilter={<DueDateFilter />} 
                    filterActive={activeFilters.due_date} > Vencimento
                </DataColumn>

                <DataColumn 
                    sortable 
                    field="description" 
                    onRenderFilter={<DescriptionFilter />} 
                    filterActive={activeFilters.description} > Descrição
                </DataColumn>

                <DataColumn 
                    sortable
                    field="category"
                    filterActive={activeFilters.category} 
                    onRender={this.formatCategory}
                    onRenderFilter={<CategoryFilter />}
                    onSort={this.sortCategory}>
                    
                    Categoria
                </DataColumn>

                <DataColumn
                    sortable 
                    field="value" 
                    onRender={this.formatValue}
                    onSort={this.sortValue}>
                    
                    Valor
                </DataColumn>

                <DataColumn sortable numeric field="priority" onRenderFilter={<PriorityFilter />} filterActive={activeFilters.priority}>Importancia</DataColumn>
                <DataColumn sortable numeric field="deadline" onRenderFilter={<DeadlineFilter />} filterActive={activeFilters.deadline}>Tolerância</DataColumn>
                <DataColumn sortable field="payment_date" onRenderFilter={<PaymentFilter />} filterActive={activeFilters.payment_date} onRender={this.formatDate}>Pago em</DataColumn>
                <DataColumn onRender={this.formatOptions} />
            </TableSort>
        );
    }
}

export default TransactionTable;