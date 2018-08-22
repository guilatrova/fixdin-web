import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Button from '@material-ui/core/Button';

import { EXPENSE } from '../../shared/kinds';
import { DataTable, DataColumn } from './../../../common/material/DataTable';
import editIconSrc from '../../../styles/icons/editIcon.png';
import deleteIconSrc from '../../../styles/icons/garbageIcon.png';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    optionIcon: {
        maxWidth: 15,
        maxHeight: 15
    }
});

const CategoryTable = ({ classes, categories, onEdit, onDelete }) => {

    // eslint-disable-next-line react/prop-types
    const OptionButton = ({ icon, children, ...props }) => (
        <Button className={classes.button} {...props}>
            <img src={icon} className={cn(classes.leftIcon, classes.optionIcon)} />
            {children}
        </Button>
    );

    const formatOptions = (category) => {
        return (
            <div>
                <OptionButton icon={editIconSrc} onClick={() => onEdit(category.id)}>
                    Editar
                </OptionButton>

                <OptionButton icon={deleteIconSrc} onClick={() => onDelete(category.id)}>
                    Deletar
                </OptionButton>
            </div>
        );
    };

    const renderKind = (category, kindField) => {
        return (category[kindField] == EXPENSE.id) ? "Despesa" : "Receita";
    };

    return (
        <DataTable data={categories} initialOrderBy="name">
            <DataColumn sortable field="kind" onRender={renderKind}>Tipo</DataColumn>
            <DataColumn sortable field="name">Nome</DataColumn>
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

export default withStyles(styles)(CategoryTable);
