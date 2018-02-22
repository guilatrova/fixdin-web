import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';

const styles = theme => ({
    root: {
        maxWidth: 300
    },
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold'
    },
    periodCell: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    valueCell: {
        fontSize: 20
    }
});

const BalancePeriodTable = ({ classes, period, incomes, expenses }) => {
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.strongCell}>Balanço</TableCell>
                        <TableCell numeric className={classes.periodCell}>{period}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell>Receitas</TableCell>
                        <TableCell numeric className={classes.valueCell}>{incomes}</TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                        <TableCell>Despesas</TableCell>
                        <TableCell numeric className={classes.valueCell}>{expenses}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.strongCell}>Resultado</TableCell>
                        <TableCell numeric className={classNames(classes.strongCell, classes.valueCell)}>{expenses}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default withStyles(styles)(BalancePeriodTable);