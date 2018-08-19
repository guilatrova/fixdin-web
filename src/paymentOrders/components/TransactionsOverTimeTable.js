import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';

import TransactionCell from './TransactionCell';
import { DataTable, DataColumn } from '../../common/material/DataTable';
import formatters from '../formatters';

const styles = theme => ({
    centered: {
        textAlign: 'center'
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
                    cellClassName={classes.centered}
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
                headersClassName={classes.centered}
            >
                <DataColumn field="account" onRender={this.formatAccount}>CONTA</DataColumn>
                <DataColumn field="description" onRender={this.formatFirst}>DESCRIÇÃO</DataColumn>
                <DataColumn field="priority" onRender={this.formatFirst}>IMP.</DataColumn>
                <DataColumn field="deadline" onRender={this.formatFirst}>TOL.</DataColumn>
                {this.renderDateColumns()}
                <DataColumn onRender={this.formatSuggestion} cellClassName={classes.centered}>
                    <span className={classes.logo}>
                        <span className={classes.userChoice}>v</span> <span className={classes.appSuggestion}>f</span>
                    </span>
                </DataColumn>
            </DataTable>
        );
    }
}

export default withStyles(styles)(TransactionsOverTimeTable);
