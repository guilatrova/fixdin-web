/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import { MenuItem } from 'material-ui/Menu';

import { EXPENSE } from '../../kinds';
import TableSort from './../../../common/material/TableSort';
import DataColumn from './../../../common/material/DataColumn';
import CollapsibleMenu from './../../../common/material/CollapsibleMenu';

const CategoryTable = ({categories, onEdit, onDelete}) => {
    const formatOptions = (category) => {
        return (
            <CollapsibleMenu>
                <MenuItem onClick={() => onEdit(category.id)}><EditIcon /> Editar</MenuItem>
                <MenuItem onClick={() => onDelete(category.id)}><DeleteIcon /> Deletar</MenuItem>
            </CollapsibleMenu>
        );
    };

    const renderKind = (category, kindField) => {
        return (category[kindField] == EXPENSE.id) ? "Despesa" : "Receita";
    };

    return (
        <TableSort data={categories} initialOrderBy="name">
            <DataColumn sortable field="kind" onRender={renderKind}>Tipo</DataColumn>
            <DataColumn sortable field="name">Nome</DataColumn>
            <DataColumn onRender={formatOptions} />
        </TableSort>
    );
};

CategoryTable.propTypes = {
    categories: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryTable;