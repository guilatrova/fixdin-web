import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import {    
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Checkbox,
  Table,
  Button,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import { getTransactions } from './transactionActions';

class TransactionList extends React.Component {

    render() {
        const rows = this.props.transactions.map((transaction) => {            
            const formattedDueDate = moment(transaction.due_date, 'yyyy-MM-dd').format('DD/MM/YYYY');
            const formattedValue = `R$ ${transaction.value.replace(".",",")}`

            return (
                <tr key={transaction.id}>
                    <td>{formattedDueDate}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category}</td>
                    <td>{formattedValue}</td>
                </tr>
            );
        });

        return (
            <Table responsive striped={true}>
                <thead>
                    <tr>
                        <th>Vencimento</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }    
}

export default TransactionList;