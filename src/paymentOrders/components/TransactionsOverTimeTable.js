import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TableSort, DataColumn } from '../../common/material/TableSort';

class TransactionsOverTimeTable extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired
    }

    renderDescription = (row) => {
        const cols = Object.keys(row);
        return row[cols[0]][0].description;
    }; 

    renderDateCell = (row, field) => row[field][0].value;

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
                <DataColumn sortable onRender={this.renderDescription}>Descrição</DataColumn>
                {this.renderDateColumns()}
            </TableSort>
        );
    }
}

export default TransactionsOverTimeTable;