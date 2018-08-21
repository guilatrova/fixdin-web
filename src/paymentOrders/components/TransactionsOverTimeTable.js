import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Switch from '@material-ui/core/Switch';

import TransactionCell from './TransactionCell';
import { DataTable, DataColumn } from '../../common/material/DataTable';
import formatters from '../formatters';

const styles = theme => ({
    centered: {
        textAlign: 'center'
    },
    left: {
        textAlign: 'left',
        paddingLeft: '15px !important'
    },
    firstColumns: {
        minWidth: "4%",
        maxWidth: "11%"
    },
    smallestColumn: {
        width: "2%" // 2% * 2 = 4%
    },
    dateColumn: {
        width: "6%" // 6% * 12 = 72%
    },
    lastColumn: {
        width: "5%"
    },
    logo: {
        fontFamily: "'Espresso Dolce', sans-serif",
        fontWeight: 'bold',
        fontSize: 24
    },
    appSuggestion: {
        color: theme.palette.primary.main
    },
    userChoice: {
        color: theme.palette.accent.main
    },
    switchOff: {
        color: theme.palette.accent.main
    },
    switchColorBar: {
        backgroundColor: theme.palette.accent.main
    }
});

class TransactionsOverTimeTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        suggested: PropTypes.array.isRequired,
        onToggle: PropTypes.func.isRequired,
        accountNames: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        onResetSelectionToSuggestion: PropTypes.func.isRequired
    }

    formatFirst = (row, field) => formatters.getFirstField(row, field);

    formatDueDate = (row, field) =>
        String(moment(formatters.getFirstField(row, field), 'YYYY-MM-DD').date()).padStart(2, '0');

    formatAccount = (row, field) => {
        const result = this.formatFirst(row, field);
        return this.props.accountNames[result] || result;
    };

    formatSuggestion = (row) => {
        const { classes, checked, suggested, onResetSelectionToSuggestion } = this.props;

        const ids = formatters.reduceTransactionsGroupToIds(row);
        const checkedInRow = checked.filter(checkedId => ids.includes(checkedId));
        const checkedSuggestion = suggested.filter(checkedId => ids.includes(checkedId));

        const isSuggested = (checkedInRow.length === checkedSuggestion.length && checkedSuggestion.every(item => checkedInRow.includes(item)));

        return (
            <Switch color="primary"
                onClick={() => onResetSelectionToSuggestion(ids)}
                checked={isSuggested}
                classes={{ switchBase: classes.switchOff, bar: classes.switchColorBar }} />
        );
    }

    renderDateCell = (row, field) => {
        const { checked, suggested, onToggle } = this.props;

        return (
            <TransactionCell
                transactions={row[field]}
                checked={checked}
                suggested={suggested}
                onToggle={onToggle}
            />
        );
    }

    renderDateColumns = () => {
        const { transactions, classes } = this.props;
        const columns = transactions[0] ? Object.keys(transactions[0]) : [];

        return columns.map((column, idx) => {
            return (
                <DataColumn
                    key={idx}
                    field={column}
                    cellClassName={cn(classes.centered, classes.dateColumn)}
                    onRender={this.renderDateCell}>

                    {moment(column, 'YYYY-MM-DD').format('MMM/YY')}

                </DataColumn>
            );
        });
    };

    render() {
        const { transactions, classes } = this.props;
        const data = transactions.map((transaction, id) => ({ ...transaction, id }));

        return (
            <DataTable
                data={data}
                className="slim-table"
            >
                <DataColumn field="account" onRender={this.formatAccount} cellClassName={cn(classes.left, classes.firstColumns)} >CONTA</DataColumn>
                <DataColumn field="due_date" onRender={this.formatDueDate} cellClassName={cn(classes.left, classes.firstColumns)} >VENC.</DataColumn>
                <DataColumn field="description" onRender={this.formatFirst} cellClassName={cn(classes.left, classes.firstColumns)} >DESCRIÇÃO</DataColumn>
                <DataColumn field="priority" onRender={this.formatFirst} cellClassName={cn(classes.centered, classes.smallestColumn)} >IMP.</DataColumn>
                <DataColumn field="deadline" onRender={this.formatFirst} cellClassName={cn(classes.centered, classes.smallestColumn)} >TOL.</DataColumn>
                {this.renderDateColumns()}
                <DataColumn onRender={this.formatSuggestion} cellClassName={cn(classes.centered, classes.lastColumn)}>
                    <span className={classes.logo}>
                        <span className={classes.userChoice}>v</span> <span className={classes.appSuggestion}>f</span>
                    </span>
                </DataColumn>
            </DataTable>
        );
    }
}

export default withStyles(styles)(TransactionsOverTimeTable);
