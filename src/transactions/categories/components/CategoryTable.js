import React from 'react';
import PropTypes from 'prop-types';

import { EXPENSE } from '../../shared/kinds';
import { DataTable, DataColumn } from './../../../common/material/DataTable';
import editIconSrc from '../../../styles/icons/editIcon.png';
import deleteIconSrc from '../../../styles/icons/garbageIcon.png';
import IconOptionButton from './../../../common/components/IconOptionButton';

const CategoryTable = ({ categories, onEdit, onDelete }) => {

    const formatOptions = (category) => {
        return (
            <div>
                <IconOptionButton src={editIconSrc} onClick={() => onEdit(category.id)} />
                <IconOptionButton src={deleteIconSrc} onClick={() => onDelete(category.id)} />
            </div>
        );
    };

    const renderKind = (category, kindField) => {
        return (category[kindField] == EXPENSE.id) ? "Despesa" : "Receita";
    };

    return (
        <DataTable data={categories} initialOrderBy="name">
            <DataColumn sortable field="kind" onRender={renderKind}>TIPO</DataColumn>
            <DataColumn sortable field="name">CATEGORIA</DataColumn>
            <DataColumn numeric onRender={formatOptions} />
        </DataTable>
    );
};

CategoryTable.propTypes = {
    categories: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default CategoryTable;
