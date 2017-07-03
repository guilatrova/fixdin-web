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

    formatDate(cell, row, defaultEmptyResponse) {
        return cell ? cell.format('DD/MM/YYYY') : defaultEmptyResponse;
    }

    formatCategory(cell, row) {
        return this.props.categories.find((category) => category.id == cell).name;
    }

    formatValue(cell, row) {
        let positiveValue = cell;
        if (positiveValue[0] == '-') {
            positiveValue = cell.substring(1);
        }
        return `R$ ${cell}`;
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
    sortValue(a, b, order) {
        const aValue = Number(a.value.replace(',', '.'));
        const bValue = Number(b.value.replace(',', '.'));
        if (order === 'desc') {
            return aValue - bValue;
        }
        else {
            return bValue - aValue;
        }
    }

    sortDate(a, b, order, field) {
        a = a[field];
        b = b[field];

        if (moment.isMoment(a) && moment.isMoment(b)) {
            if (order === 'desc')
                return a.unix() - b.unix();
            else
                return b.unix() - a.unix();
        }

        if (moment.isMoment(a)) {
            return (order === 'desc') ? -1 : 1;
        }

        if (moment.isMoment(b)) {
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