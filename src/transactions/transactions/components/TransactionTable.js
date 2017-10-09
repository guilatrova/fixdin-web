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

import { sort } from './../../../common/sorts';
import TableSort from './../../../common/components/material/TableSort';
import DataColumn from './../../../common/components/material/DataColumn';
import CollapsibleMenu from './../../../common/components/material/CollapsibleMenu';
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
        let positiveValue = cell.toFixed(2).toString().replace(".", ",");
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

    sortCategory(a, b, order) {
        const { categories } = this.props;
        const catA = categories.find((category) => category.id == a).name.toUpperCase();
        const catB = categories.find((category) => category.id == b).name.toUpperCase();

        return sort(catA, catB, order);
    }

    sortDate(a, b, order) {
        if (moment.isMoment(a) && moment.isMoment(b)) { 
            if (order === 'desc') 
                return b.unix() - a.unix(); 
            else 
                return a.unix() - b.unix(); 
        } 
 
        if (moment.isMoment(a)) { 
            return (order === 'desc') ? 1 : -1; 
        } 
    
        if (moment.isMoment(b)) { 
            return (order === 'desc') ? -1 : 1; 
        } 
    
        return 0; 
    }

    render () {
        const { onEdit, onDelete, onCopy, displayKind } = this.props;
        const displayOptions = onEdit && onDelete && onCopy;

        return (
            <TableSort data={this.props.transactions} initialOrderBy="due_date">

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
                    sortable 
                    field="value" 
                    onRender={this.formatValue}
                    onSort={this.sortValue}>
                    
                    Valor
                </DataColumn>

                <DataColumn sortable numeric field="priority">Prioridade</DataColumn>
                <DataColumn sortable numeric field="deadline">Prazo</DataColumn>
                {displayOptions && <DataColumn onRender={this.formatOptions} />}
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