import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { formatCurrencyDisplay } from '../../../../utils/formatters';

const styles = {
    row: {

    },
    baseCell: {

    },
    firstColumnCell: {

    },
    incomesCell: {

    },
    expensesCell: {

    },
    totalCell: {

    },
    lastColumnCell: {

    },
    highlightCell: {

    }
};

const EntryTableRow = ({ entry, name, classes }) => {
    const highlightClass = { [classes.highlightCell]: !!entry.highlight };
    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.firstColumnCell)}>
                {name}
            </TableCell>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.incomesCell)}>
                {formatCurrencyDisplay(entry.incomes)}
            </TableCell>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.expensesCell, highlightClass)}>
                {formatCurrencyDisplay(entry.expenses)}
            </TableCell>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.totalCell, classes.lastColumnCell, highlightClass)}>
                {formatCurrencyDisplay(entry.total)}
            </TableCell>
        </TableRow>
    );
};

EntryTableRow.propTypes = {
    entry: PropTypes.shape({
        incomes: PropTypes.number.isRequired,
        expenses: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        highlight: PropTypes.bool
    }),
    name: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EntryTableRow);
