import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import PayedSign from '../../../../common/components/PayedSign';

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

    }
};

const HeadersRow = ({ classes }) => {
    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.firstColumnCell)}>
                Contas
            </TableCell>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.incomesCell)}>
                Receitas <PayedSign />
            </TableCell>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.expensesCell)}>
                Despesas <PayedSign pending />
            </TableCell>
            <TableCell padding="dense" className={classNames(classes.baseCell, classes.totalCell, classes.lastColumnCell)}>
                Total
            </TableCell>
        </TableRow>
    );
};

HeadersRow.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeadersRow);
