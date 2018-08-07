/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import { formatCurrencyDisplay } from '../../../utils/formatters';
import PayedSign from '../../../common/components/PayedSign';

const rowHeight = 40;
const rowsUntilScroll = 5;
const maxHeight = (rowHeight * rowsUntilScroll) + (rowHeight / 2);
const widthSplitten = "16%";
const scrollbarWidth = 15;

const styles = () => ({
    row: {
        height: rowHeight
    },
    baseCell: {
        textAlign: 'center',
        backgroundColor: '#faf3f9',
        width: widthSplitten,
    },
    footerCell: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: widthSplitten,
    },
    firstColumnCell: {
        textAlign: 'left !important',
        width: widthSplitten,
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: "12px",
        width: widthSplitten,
    },
    padScrollbar: {
        boxSizing: "border-box",
        paddingRight: scrollbarWidth
    },
    scrollable: {
        maxHeight: maxHeight,
        overflowY: "auto",
    }
});

const Headers = ({ classes }) => {
    const DetailedHeader = ({ title, subtitle, expense = false }) => <span>{title} <PayedSign pending={expense} /><br /> <small>{subtitle}</small></span>;

    return (
        <TableRow className={classes.row}>
            <TableCell padding="dense" className={classNames(classes.headerCell, classes.firstColumnCell)}>Contas</TableCell>
            <TableCell padding="dense" className={classes.headerCell}>
                <DetailedHeader title="Receitas" subtitle="reais" />
            </TableCell>
            <TableCell padding="dense" className={classes.headerCell}>
                <DetailedHeader title="Despesas" subtitle="reais" expense />
            </TableCell>
            <TableCell padding="dense" className={classes.headerCell}>
                <DetailedHeader title="Receitas" subtitle="pendentes" />
            </TableCell>
            <TableCell padding="dense" className={classes.headerCell}>
                <DetailedHeader title="Despesas" subtitle="pendentes" expense />
            </TableCell>
            <TableCell padding="dense" numeric className={classes.headerCell}>Total</TableCell>
        </TableRow>
    );
};

const EntryTableRow = ({ entry, name, id, classes, cellModifierClass }) => {
    return (
        <TableRow key={id} className={classes.row}>
            <TableCell padding="dense" className={classNames(cellModifierClass, classes.firstColumnCell)}>{name}</TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalIncomesPayed)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalIncomesPending)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalExpensesPayed)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.totalExpensesPending)}
            </TableCell>
            <TableCell padding="dense" className={classNames(cellModifierClass)}>
                {formatCurrencyDisplay(entry.balance)}
            </TableCell>
        </TableRow>
    );
};

const CompleteAccountsTable = ({ classes, names, values }) => {
    const rows = values.map(entry => {
        const idx = values.indexOf(entry);
        return <EntryTableRow key={idx} entry={entry} name={names[idx]} id={idx} classes={classes} cellModifierClass={classes.baseCell} />;
    });

    const willScroll = rows.length > rowsUntilScroll;

    return (
        <div className={classes.root}>
            <div className={classNames({ [classes.padScrollbar]: willScroll })}>
                <Table>
                    <TableHead>
                        <Headers classes={classes} />
                    </TableHead>
                </Table>
            </div>

            <div className={classes.scrollable}>
                <Table>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </div>

            {values.total &&
                <div className={classNames({ [classes.padScrollbar]: willScroll })}>
                    <Table className={classes.padScrollbar}>
                        <TableFooter>
                            <EntryTableRow entry={values.total} name={"Total"} id="0" classes={classes} cellModifierClass={classes.footerCell} />
                        </TableFooter>
                    </Table>
                </div>}
        </div>
    );
};

CompleteAccountsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    names: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired
};

export default withStyles(styles)(CompleteAccountsTable);