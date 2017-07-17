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

import SortableColumns from '../../../common/components/material/SortableColumns';
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

function sortNumeric(a, b, order) {
    const transactionOneValue = Number(a.replace(',', '.'));
    const transactionTwoValue = Number(b.replace(',', '.'));
    if (order === 'desc') {
        return transactionOneValue - transactionTwoValue;
    }
    else {
        return transactionTwoValue - transactionOneValue;
    }
}

function sortCategory(a, b, order, categories) {    
    const catA = categories.find((category) => category.id == a).name;
    const catB = categories.find((category) => category.id == b).name;

    return sortAlphabetically(catA, catB, order);
}

function sortDate(transactionOneDate, transactionTwoDate, order) {
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

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'due_date',
            sortedData: []
        };

        this.formatCategory = this.formatCategory.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
    }

    formatDate(cell) {
        return cell ? cell.format('DD/MM/YYYY') : 'NÃO PAGO';
    }

    formatCategory(cell) {
        const {categories} = this.props;
        return categories.length === 0 ? '' : categories.find((category) => category.id == cell).name;
    }

    formatValue(cell) {
        let positiveValue = cell;
        if (positiveValue[0] == '-') {
            positiveValue = cell.substring(1);
        }
        return `R$ ${positiveValue}`;
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        let sortedData = [];
        switch(orderBy) {
            case 'due_date':
            case 'payment_date':
                sortedData = this.props.transactions.sort((a, b) => sortDate(a[orderBy], b[orderBy], order));
                break;

            case 'value':
                sortedData = this.props.transactions.sort((a, b) => sortNumeric(a[orderBy], b[orderBy], order));
                break;

            case 'category':
                sortedData = this.props.transactions.sort((a, b) => sortCategory(a[orderBy], b[orderBy], order, this.props.categories));
                break;

            default:
                sortedData = this.props.transactions.sort((a, b) => sortAlphabetically(a[orderBy], b[orderBy], order));
                break;
        }         

        this.setState({ sortedData, order, orderBy });
    };

    render() {
        const { onEdit, onDelete, onCopy, classes } = this.props;
        const { order, orderBy } = this.state;
        const data = this.props.transactions;

        const rows = data.map(transaction => {
            return (
                <TableRow hover tabIndex="-1" key={transaction.id}>

                    <TableCell>
                        {this.formatDate(transaction.due_date)}
                    </TableCell>
                    <TableCell>
                        {transaction.description}
                    </TableCell>
                    <TableCell>
                        {this.formatCategory(transaction.category)}
                    </TableCell>
                    <TableCell numeric>
                        {this.formatValue(transaction.value)}
                    </TableCell>
                    <TableCell numeric>
                        {transaction.deadline}
                    </TableCell>
                    <TableCell numeric>
                        {transaction.priority}
                    </TableCell>
                    <TableCell>
                        {this.formatDate(transaction.payment_date)}
                    </TableCell>
                    <TableCell disablePadding={true}>
                        <CollapsibleMenu>
                            <MenuItem onClick={() => onEdit(transaction.id)}><EditIcon /> Editar</MenuItem>
                            <MenuItem onClick={() => onCopy(transaction.id)}><ContentCopyIcon /> Copiar</MenuItem>
                            <MenuItem onClick={() => onDelete(transaction.id)}><DeleteIcon /> Deletar</MenuItem>
                        </CollapsibleMenu>
                    </TableCell>

                </TableRow>
        );
    });

    return (
      <Paper className={classes.paper}>
        <Table>
          <SortableColumns
            columns={columnData}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />

          <TableBody>
            {rows}
          </TableBody>

        </Table>
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