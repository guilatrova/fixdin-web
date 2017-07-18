// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui-icons/Delete';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import EditIcon from 'material-ui-icons/ModeEdit';

import { DataColumn, SortableTable } from '../../../common/components/material/SortableColumns';
import CollapsibleMenu from '../../../common/components/material/CollapsibleMenu';

const columnData = [
    { id: 'due_date', numeric: false, label: 'Vencimento' },
    { id: 'description', numeric: false, label: 'Descrição' },
    { id: 'category', numeric: false, label: 'Categoria' },
    { id: 'value', numeric: true, label: 'Valor' },
    { id: 'deadline', numeric: true, label: 'Prazo' },
    { id: 'priority', numeric: true, label: 'Prioridade' },
    { id: 'payment_date', numeric: false, label: 'Pago em' },
    { id: 'actions', numeric: false, label: '', disablePadding: true }
];

const styleSheet = createStyleSheet('TransactionList', theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));

function sortAlphabetically(a, b, order) {
    if (order === 'desc') 
        return b > a;
    
    return a > b;
}

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'due_date',
            sortedData: []
        };

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
        let positiveValue = cell;
        if (positiveValue[0] == '-') {
            positiveValue = cell.substring(1);
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

    //Sort
    sortValue(a, b, order) {
        const transactionOneValue = Number(a.replace(',', '.'));
        const transactionTwoValue = Number(b.replace(',', '.'));
        if (order === 'desc') {
            return transactionOneValue - transactionTwoValue;
        }
        else {
            return transactionTwoValue - transactionOneValue;
        }
    }

    sortCategory(a, b, order) {
        const { categories } = this.props;
        const catA = categories.find((category) => category.id == a).name;
        const catB = categories.find((category) => category.id == b).name;

        return sortAlphabetically(catA, catB, order);
    }

    render() {
        const { onEdit, onDelete, onCopy, classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <SortableTable data={this.props.transactions}>
                    <DataColumn field="due_date" onRender={this.formatDate}>Vencimento</DataColumn>
                    <DataColumn field="description">Descrição</DataColumn>

                    <DataColumn 
                        field="category" 
                        onRender={this.formatCategory}
                        onSort={this.sortCategory}>
                        
                        Categoria
                    </DataColumn>

                    <DataColumn 
                        field="value" 
                        onRender={this.formatValue}
                        onSort={this.sortValue}>
                        
                        Valor
                    </DataColumn>

                    <DataColumn field="deadline">Prazo</DataColumn>
                    <DataColumn field="priority">Prioridade</DataColumn>
                    <DataColumn field="payment_date" onRender={this.formatDate}>Pago em</DataColumn>
                    <DataColumn onRender={this.formatOptions} disablePadding />
                </SortableTable>
            </Paper>
        );
    }
}

TransactionList.propTypes = {
    classes: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
};

export default withStyles(styleSheet)(TransactionList);