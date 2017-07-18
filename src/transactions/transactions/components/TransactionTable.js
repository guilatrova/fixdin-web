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

import TableSort from 'TableSort';
import DataColumn from 'DataColumn';
import CollapsibleMenu from 'CollapsibleMenu';

const styleSheet = createStyleSheet('TransactionTable', theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));

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
        const aValue = Number(a.replace(',', '.'));
        const bValue = Number(b.replace(',', '.'));
        if (order === 'desc') {
            return aValue - bValue;
        }
        else {
            return bValue - aValue;
        }
    }

    sortCategory(a, b, order) {
        const { categories } = this.props;
        const catA = categories.find((category) => category.id == a).name;
        const catB = categories.find((category) => category.id == b).name;

        if (order === 'desc') 
            return catB > catA;
    
        return catA > catB;
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <TableSort data={this.props.transactions}>
                    <DataColumn sortable field="due_date" onRender={this.formatDate}>Vencimento</DataColumn>
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
                    <DataColumn sortable field="payment_date" onRender={this.formatDate}>Pago em</DataColumn>
                    <DataColumn onRender={this.formatOptions} disablePadding />
                </TableSort>
            </Paper>
        );
    }
}

TransactionTable.propTypes = {
    classes: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(TransactionTable);