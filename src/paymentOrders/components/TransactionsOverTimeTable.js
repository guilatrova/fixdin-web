import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TransactionCell from './TransactionCell';
import { TableSort, DataColumn } from '../../common/material/TableSort';

class TransactionsOverTimeTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        checked: PropTypes.array.isRequired,
        onToggle: PropTypes.func.isRequired
    }
    
    renderDescription = (row) => {
        const cols = Object.keys(row);
        for (let col of cols) {
            for (let transaction of row[col]) {
                if (transaction && transaction.description)
                    return transaction.description;
            }
        }
        return "not found";
    };

    renderDateCell = (row, field) => (        
        <TransactionCell transactions={row[field]} checked={this.props.checked} onToggle={this.props.onToggle} />
    );

    renderDateColumns = () => {
        const { transactions } = this.props;
        const columns = Object.keys(transactions[0]);

        return columns.map((column, idx) => {
            return (
                <DataColumn 
                    key={idx}
                    field={column}
                    onRender={this.renderDateCell}>

                    {moment(column, 'YYYY-MM-DD').format('MM/YYYY')}
                    
                </DataColumn>
            );
        });
    };

    render() {
        const { transactions } = this.props;
        const data = transactions.map((transaction, id) => ({ ...transaction, id }));

        return (
            <TableSort data={data}>
                <DataColumn field="description" onRender={this.renderDescription}>Descrição</DataColumn>
                {this.renderDateColumns()}
            </TableSort>
        );
    }
}

export default TransactionsOverTimeTable;