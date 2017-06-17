import React from 'react';

import {    
  Icon,
  Table,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from '@sketchpixy/rubix';

const TransactionList = ({ transactions, categories, onEdit, onDelete }) => {
    const rows = transactions.map((transaction) => {
            const formattedDueDate = transaction.due_date.format('DD/MM/YYYY');
            const formattedValue = `R$ ${transaction.value}`;
            const category = categories.find((category) => category.id == transaction.category).name;

            return (
                <tr key={transaction.id}>
                    <td>{formattedDueDate}</td>
                    <td>{transaction.description}</td>
                    <td>{category}</td>
                    <td>{formattedValue}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="edit-button" outlined bsStyle="blue" onClick={() => onEdit(transaction.id)}>
                                <Icon glyph='icon-fontello-pencil' />
                                {' '}
                                Editar
                            </Button>
                            <Button className="delete-button" outlined bsStyle="red" onClick={() => onDelete(transaction.id)}>                                
                                <Icon glyph='icon-fontello-trash-1' />
                                {' '}
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

export default TransactionList;