import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import { DatePicker } from 'material-ui-pickers';
//import red from 'material-ui/colors/red';

import { formatCurrencyDisplay } from '../../utils/formatters';

const styles = theme => ({
    row: {
        height: 0
    },
    strongCell: {
        color: 'black',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    periodInput: {
        color: theme.palette.primary.main,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right'        
    },
    expenseCell: {
        // color: red['A700'],
        whiteSpace: 'nowrap'
    },
    valueCell: {
        fontSize: 20,
        whiteSpace: 'nowrap'
    }
});

const BalanceSimpleTable = ({ classes, period, incomesLabel, incomes, expensesLabel, expenses, total, onChangePeriod }) => {
    return (
        <div className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Balanço</TableCell>
                        <TableCell padding="dense" numeric>
                            <DatePicker
                                value={period}
                                format="MMM-YY"
                                onClick={e => onChangePeriod ? e : e.preventDefault()}
                                onChange={onChangePeriod ? onChangePeriod : () => {}}
                                InputProps={{
                                    disableUnderline: true,
                                    classes: {
                                        input: classes.periodInput
                                    }
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense">{incomesLabel}</TableCell>
                        <TableCell padding="dense" numeric className={classes.valueCell}>{formatCurrencyDisplay(incomes)}</TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense">{expensesLabel}</TableCell>
                        <TableCell padding="dense" numeric className={classNames(classes.valueCell, classes.expenseCell)}>{formatCurrencyDisplay(expenses)}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className={classes.row}>
                        <TableCell padding="dense" className={classes.strongCell}>Resultado</TableCell>
                        <TableCell padding="dense" numeric className={classNames(classes.strongCell, classes.valueCell)}>{formatCurrencyDisplay(total)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

BalanceSimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    period: PropTypes.object.isRequired,
    incomesLabel: PropTypes.string.isRequired,
    expensesLabel: PropTypes.string.isRequired,
    incomes: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onChangePeriod: PropTypes.func,
};

BalanceSimpleTable.defaultProps = {
    expensesLabel: "Despesas",
    incomesLabel: "Receitas"
};

export default withStyles(styles)(BalanceSimpleTable);