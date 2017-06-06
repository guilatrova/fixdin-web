import React from 'react';

import {    
  Icon,
  Table,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from '@sketchpixy/rubix';

const CategoryList = ({categories}) => {
    const rows = categories.map((category) => {
        return (
            <tr key={category.id}>
                <td>{category.name}</td>
            </tr>
        )
    });

    return (
        <Table responsive striped={true}>
            <thead>
                <tr>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

export default CategoryList;