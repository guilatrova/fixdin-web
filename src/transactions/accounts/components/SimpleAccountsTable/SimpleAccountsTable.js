/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import red from '@material-ui/core/colors/red';

import EntryTableRow from './EntryTableRow';
import HeaderRow from './HeaderRow';
import formatters from '../../formatters';

const rowHeight = 40;
const rowsUntilScroll = 5;
const maxHeight = (rowHeight * rowsUntilScroll) + (rowHeight / 2);
const widthSplitten = "25%";
const scrollbarWidth = 15;

const styles = () => ({
    root: {

    },
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
    highlightCell: {
        color: red["900"]
    },
    firstColumnCell: {
        textAlign: 'left !important',
    },
    lastColumnCell: {
        textAlign: 'right !important',
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

const SimpleAccountsTable = ({ classes, names, values }) => {
    const rows = values.map(entry => (
        <EntryTableRow
            key={entry.account}
            name={names[entry.account]}
            entry={entry}
            classes={{
                row: classes.row,
                baseCell: classes.baseCell,
                firstColumnCell: classes.firstColumnCell,
                lastColumnCell: classes.lastColumnCell,
                highlightCell: classes.highlightCell
            }}
        />
    ));

    const willScroll = rows.length > rowsUntilScroll;
    const totals = formatters.reduceTotalAccounts(values);
    totals.highlight = values.some(v => v.highlight);

    return (
        <div className={classes.root}>
            <div className={classNames({ [classes.padScrollbar]: willScroll })}>
                <Table>
                    <TableHead>
                        <HeaderRow classes={{
                            row: classes.row,
                            baseCell: classes.headerCell,
                            firstColumnCell: classes.firstColumnCell,
                            lastColumnCell: classes.lastColumnCell
                        }} />
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

            <div className={classNames({ [classes.padScrollbar]: willScroll })}>
                <Table>
                    <TableFooter>
                        <EntryTableRow
                            entry={totals}
                            name="Total"
                            classes={{
                                row: classes.row,
                                baseCell: classes.footerCell,
                                firstColumnCell: classes.firstColumnCell,
                                lastColumnCell: classes.lastColumnCell,
                                highlightCell: classes.highlightCell
                            }}
                        />
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

SimpleAccountsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    names: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired
};

export default withStyles(styles)(SimpleAccountsTable);
