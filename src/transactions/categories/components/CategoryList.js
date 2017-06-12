import React from 'react';

import {    
  Icon,
  Table,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from '@sketchpixy/rubix';

const CategoryList = ({categories, onEdit}) => {
    const rows = categories.map((category) => {
        return (
            <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                    <ButtonToolbar>
                        <Button className="edit-button" outlined bsStyle="blue" onClick={() => onEdit(category.id)} >
                            <Icon glyph='icon-fontello-pencil' />
                            {' '}
                            Editar
                        </Button>
                    </ButtonToolbar>
                </td>
            </tr>
        )
    });

    return (
        <Table responsive striped={true}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default CategoryList;