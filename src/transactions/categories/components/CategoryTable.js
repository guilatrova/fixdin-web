import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import { MenuItem } from 'material-ui/Menu';

import TableSort from './../../../common/material/TableSort';
import DataColumn from './../../../common/material/DataColumn';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';

const CategoryList = ({categories, onEdit, onDelete}) => {
    const formatOptions = (category) => {
        return (
            <CollapsibleMenu>
                <MenuItem onClick={() => onEdit(category.id)}><EditIcon /> Editar</MenuItem>
                <MenuItem onClick={() => onDelete(category.id)}><DeleteIcon /> Deletar</MenuItem>
            </CollapsibleMenu>
        );
    };

    return (
        <TableSort data={categories} initialOrderBy="name">
            <DataColumn sortable field="name">Nome</DataColumn>
            <DataColumn onRender={formatOptions} />
        </TableSort>
    );
};

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryList;