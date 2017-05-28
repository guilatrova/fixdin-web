import React, { PropTypes } from 'react';
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
  ButtonToolbar,
  ButtonGroup,
  Button,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

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
                    <td>
                        <ButtonToolbar>
                            <Button className="edit-button" outlined bsStyle="blue" onClick={() => this.props.onEdit(transaction.id)}>
                                <Icon glyph='icon-fontello-pencil' />
                                Editar
                            </Button>
                            <Button className="delete-button" outlined bsStyle="blue" onClick={() => this.props.onDelete(transaction.id)}>
                                {/*<Icon glyph='icon-fontello-pencil' />*/}
                                Deletar
                            </Button>
                        </ButtonToolbar>
                    </td>
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
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }    
}

TransactionList.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default TransactionList;