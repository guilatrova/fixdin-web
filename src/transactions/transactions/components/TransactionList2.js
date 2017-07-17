import React from 'react';

import {    
  Icon,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from '@sketchpixy/rubix';

import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'due_date',
            defaultSortOrder: 'asc'
        }
        this.formatCategory = this.formatCategory.bind(this);
        this.formatActionButtons = this.formatActionButtons.bind(this);
    }

    formatActionButtons(cell, row) {
        const { onEdit, onDelete, onCopy } = this.props;
        return (
            <ButtonToolbar>
                <Button className="edit-button" outlined bsStyle="green" onClick={() => onEdit(row.id)}>
                    <Icon glyph='icon-fontello-pencil' />
                    {' '}
                    Editar
                </Button>
                <Button className="delete-button" outlined bsStyle="red" onClick={() => onDelete(row.id)}>                                
                    <Icon glyph='icon-fontello-trash-1' />
                    {' '}
                    Deletar
                </Button>
                <Button className="copy-button" outlined bsStyle="blue" onClick={() => onCopy(row.id)}>                                
                    <Icon glyph='icon-ikons-copy-2' />
                    {' '}
                    Copiar
                </Button>
            </ButtonToolbar>
        );
    }

    //SORT
    sortValue(transactionOne, transactionTwo, order) {
        const transactionOneValue = Number(transactionOne.value.replace(',', '.'));
        const transactionTwoValue = Number(transactionTwo.value.replace(',', '.'));
        if (order === 'desc') {
            return transactionOneValue - transactionTwoValue;
        }
        else {
            return transactionTwoValue - transactionOneValue;
        }
    }

    sortDate(transactionOneDate, transactionTwoDate, order, field) {
        transactionOneDate = transactionOneDate[field];
        transactionTwoDate = transactionTwoDate[field];

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

    render() {
        return (
            <BootstrapTable data={this.props.transactions} options={this.options} keyField="id">
                <TableHeaderColumn dataField='due_date' dataFormat={this.formatDate} 
                                   dataSort sortFunc={this.sortDate}>
                    Vencimento
                </TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='description'>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='category' dataFormat={this.formatCategory}>Categoria</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='value' dataFormat={this.formatValue} sortFunc={this.sortValue}>Valor</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='deadline'>Prazo</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='priority'>Prioridade</TableHeaderColumn>
                <TableHeaderColumn dataField='payment_date' 
                                   dataFormat={this.formatDate} formatExtraData="NÃO" 
                                   dataSort sortFunc={this.sortDate}>
                    Pago em
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.formatActionButtons}>Ações</TableHeaderColumn>            
            </BootstrapTable>
        );
    }
}

export default TransactionList;