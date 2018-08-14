import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';

import TransactionCell from './TransactionCell';
import { DataTable, DataColumn } from '../../common/material/DataTable';
import PayedSign from '../../common/components/PayedSign';
import specifications from '../../transactions/transactions/specifications';

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
        color: theme.palette.accent.main,
        "& + $colorBar": {
            backgroundColor: theme.palette.accent.main
        }
    },
    switchColorBar: {
        backgroundColor: theme.palette.accent.main
    }//Required
});

class TransactionsOverTimeTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        onToggle: PropTypes.func.isRequired,
        accountNames: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired
    }

    formatFirst = (row, field) => {
        try {
            const cols = Object.keys(row);
            for (let col of cols) {
                for (let transaction of row[col]) {
                    if (transaction && (transaction[field] || transaction[field] == 0))
                        return transaction[field];
                }
            }
        }
        catch (error) {
            return `error: ${field}`;
        }
        return "not found";
    };

    formatAccount = (row, field) => {
        const result = this.formatFirst(row, field);
        return this.props.accountNames[result] || result;
    };

    formatSuggestion = (row) => {
        const { classes } = this.props;
        return <Switch color="primary" classes={{ switchBase: classes.switchOff, bar: classes.switchColorBar }} />;
    }

    renderDateCell = (row, field) => (
        <TransactionCell transactions={row[field]} checked={this.props.checked} onToggle={this.props.onToggle} />
    );

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
                <DataColumn field="due" onRender={this.formatSuggestion} cellClassName={classes.centered}>
                    <span className={classes.logo}>
                        <span className={classes.userChoice}>v</span> <span className={classes.appSuggestion}>f</span>
                    </span>
                </DataColumn>
            </DataTable>
        );
    }
}

export default withStyles(styles)(TransactionsOverTimeTable);
