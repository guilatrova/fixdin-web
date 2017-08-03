import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import { MenuItem } from 'material-ui/Menu';

import DeleteIcon from 'material-ui-icons/Delete';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import EditIcon from 'material-ui-icons/ModeEdit';

import TableSort from 'TableSort';
import DataColumn from 'DataColumn';
import CollapsibleMenu from 'CollapsibleMenu';
import { EXPENSE, INCOME, ALL, getKind } from '../../kinds';

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);

        this.formatCategory = this.formatCategory.bind(this);
        this.formatOptions = this.formatOptions.bind(this);
        this.sortCategory = this.sortCategory.bind(this);
    }

    //Format
    formatDate(row, field) {
        const cell = row[field];
        return cell ? cell.format('DD/MM/YYYY') : 'NÃO PAGO';
    }

    formatCategory(row, field) {
        const cell = row[field];
        const { categories } = this.props;
        return categories.length === 0 ? '' : categories.find((category) => category.id == cell).name;
    }

    formatValue(row, field) {
        const cell = row[field];
        let positiveValue = cell.toString().replace(".", ",");
        if (positiveValue[0] == '-') {
            positiveValue = positiveValue.substring(1);
        }
        return `R$ ${positiveValue}`;
    }

    formatOptions(transaction) {
        const { onEdit, onDelete, onCopy } = this.props;

        return (
            <CollapsibleMenu>
                <MenuItem onClick={() => onEdit(transaction.id)}><EditIcon /> Editar</MenuItem>
                <MenuItem onClick={() => onCopy(transaction.id)}><ContentCopyIcon /> Copiar</MenuItem>
                <MenuItem onClick={() => onDelete(transaction.id)}><DeleteIcon /> Deletar</MenuItem>
            </CollapsibleMenu>
        );
    }

    formatKind(transaction) {
        return getKind(transaction.kind).text;
    }

    //Sort
    sortValue(a, b, order) {
        const valueA = Number(a);
        const valueB = Number(b);

        if (order === 'desc')
            return valueA - valueB;

        return valueB - valueA;
    }

    sortCategory(a, b, order) {
        const { categories } = this.props;
        const catA = categories.find((category) => category.id == a).name;
        const catB = categories.find((category) => category.id == b).name;

        if (order === 'desc') 
            return catB > catA;
    
        return catA > catB;
    }

    sortDate(transactionOneDate, transactionTwoDate, order) {
        if (moment.isMoment(transactionOneDate) && moment.isMoment(transactionTwoDate)) { 
            if (order === 'desc') 
                return transactionOneDate.unix() - transactionTwoDate.unix(); 
            else 
                return transactionTwoDate.unix() - transactionOneDate.unix(); 
        } 
 
        if (moment.isMoment(transactionOneDate)) { 
            return (order === 'desc') ? -1 : 1; 
        } 
    
        if (moment.isMoment(transactionTwoDate)) { 
            return (order === 'desc') ? 1 : -1; 
        } 
    
        return 0; 
    }

    render () {
        const { onEdit, onDelete, onCopy, displayKind } = this.props;
        const displayOptions = onEdit && onDelete && onCopy;

        return (
            <TableSort data={this.props.transactions}>

                {displayKind && <DataColumn sortable field="kind" onRender={this.formatKind}>Tipo</DataColumn>}
                <DataColumn sortable field="due_date" onRender={this.formatDate} onSort={this.sortDate}>Vencimento</DataColumn>
                <DataColumn sortable field="payment_date" onRender={this.formatDate} onSort={this.sortDate}>Pago em</DataColumn>
                <DataColumn sortable field="description">Descrição</DataColumn>

                <DataColumn 
                    sortable
                    field="category" 
                    onRender={this.formatCategory}
                    onSort={this.sortCategory}>
                    
                    Categoria
                </DataColumn>

                <DataColumn
                    sortable numeric 
                    field="value" 
                    onRender={this.formatValue}
                    onSort={this.sortValue}>
                    
                    Valor
                </DataColumn>

                <DataColumn sortable numeric field="deadline">Prazo</DataColumn>
                <DataColumn sortable numeric field="priority">Prioridade</DataColumn>
                {displayOptions && <DataColumn onRender={this.formatOptions} disablePadding />}
            </TableSort>
        );
    }
}

TransactionTable.propTypes = {
    classes: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onCopy: PropTypes.func,
    onDelete: PropTypes.func,
};

export default TransactionTable;