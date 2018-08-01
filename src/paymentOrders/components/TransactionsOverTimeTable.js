import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TransactionCell from './TransactionCell';
import { DataTable, DataColumn } from '../../common/material/DataTable';
import PayedSign from '../../common/components/PayedSign';
import specifications from '../../transactions/transactions/specifications';

class TransactionsOverTimeTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        onToggle: PropTypes.func.isRequired,
        accountNames: PropTypes.array.isRequired
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

    formatDue = (row) => {
        const cols = Object.keys(row);
        for (let col of cols) {
            if (Array.isArray(row[col])) {
                for (let transaction of row[col]) {
                    if (transaction && specifications.isOverdue(transaction))
                        return <PayedSign pending />;
                }
            }
        }

        return <PayedSign />;
    }

    renderDateCell = (row, field) => (
        <TransactionCell transactions={row[field]} checked={this.props.checked} onToggle={this.props.onToggle} />
    );

    renderDateColumns = () => {
        const { transactions } = this.props;
        const columns = transactions[0] ? Object.keys(transactions[0]) : [];

        return columns.map((column, idx) => {
            return (
                <DataColumn
                    key={idx}
                    field={column}
                    onRender={this.renderDateCell}>

                    {moment(column, 'YYYY-MM-DD').format('MMM-YY')}

                </DataColumn>
            );
        });
    };

    render() {
        const { transactions } = this.props;
        const data = transactions.map((transaction, id) => ({ ...transaction, id }));

        return (
            <DataTable data={data} className="slim-table">
                <DataColumn field="account" onRender={this.formatAccount}>CONTA</DataColumn>
                <DataColumn field="description" onRender={this.formatFirst}>DESCRIÇÃO</DataColumn>
                <DataColumn field="priority" onRender={this.formatFirst}>IMP.</DataColumn>
                <DataColumn field="deadline" onRender={this.formatFirst}>TOL.</DataColumn>
                {this.renderDateColumns()}
                <DataColumn field="due" onRender={this.formatDue}>PG.</DataColumn>
            </DataTable>
        );
    }
}

export default TransactionsOverTimeTable;