import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

import TableHeaderLabel from './TableHeaderLabel';

const styles = theme => ({
    popoverPaper: {
        padding: 16,
        maxWidth: 500,
        marginTop: theme.spacing.unit * 3,
        overflow: "visible",
    },
    tableHeader: {
        display: 'inline-flex',
        flexWrap: 'nowrap',
    },
    headerCell: {
        fontWeight: 'bold'
    },
    filterActive: {
        opacity: 1
    },
    filterDisabled: {
        opacity: 0.5,
        "&:hover": {
            opacity: 1,
        }
    },
    filterButton: {
        width: 'auto',
        height: 'auto',
        padding: '3px 0',
    }
});

class DataTable extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        columnKey: PropTypes.string.isRequired,
        children: PropTypes.node,
        initialOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
        initialOrderBy: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        filterActiveColor: PropTypes.string.isRequired,
        cellsClassName: PropTypes.string,
        headersClassName: PropTypes.string,
        filterIcon: PropTypes.node,
        className: PropTypes.string
    }

    static defaultProps = {
        columnKey: 'id',
        initialOrder: 'asc',
        initialOrderBy: '',
        filterActiveColor: 'primary',
        filterIcon: <FilterListIcon />
    }

    constructor(props) {
        super(props);

        this.state = {
            order: props.initialOrder,
            orderBy: props.initialOrderBy,
            data: props.data,
            popover: "",
        };
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    handleHeaderClick(column) {
        const { field, sortable } = column.props;

        if (sortable) {
            let order = this.state.order;

            if (field == this.state.orderBy) {
                order = (order === 'asc' ? 'desc' : 'asc');
            }
            else {
                order = 'asc';
            }

            this.setState({
                orderBy: field,
                order
            });

            this.sort(field, order);
        }
    }

    sort(orderBy, order) {
        if (orderBy) {
            const sortFunc = React.Children.toArray(this.props.children).find(column => column.props.field == orderBy).props.onSort;

            return this.state.data.slice().sort((a, b) => sortFunc(a[orderBy], b[orderBy], order));
        }

        return this.state.data.slice();
    }

    render() {
        const { columnKey, children, filterActiveColor, classes, cellsClassName, headersClassName, filterIcon, className } = this.props;
        const { order, orderBy } = this.state;
        const handleHeaderClick = this.handleHeaderClick;
        const data = this.sort(this.state.orderBy, this.state.order);

        const renderFilter = (child) => {
            if (child.props.filterComponent) {
                let buttonRef;
                const { popover } = this.state;
                const onClose = () => this.setState({ popover: "" });
                return (
                    <div>
                        <IconButton
                            aria-label="Filter list"
                            className={classNames(classes.filterButton, {
                                [classes.filterActive]: child.props.filterActive,
                                [classes.filterDisabled]: !child.props.filterActive
                            })}
                            color={child.props.filterActive ? filterActiveColor : "default"}
                            ref={node => { buttonRef = node; }}
                            onClick={() => this.setState({
                                popover: child.props.field,
                                popoverRef: findDOMNode(buttonRef)
                            })}
                        >
                            {filterIcon}
                        </IconButton>

                        <Popover
                            classes={{ paper: classes.popoverPaper }}
                            open={popover == child.props.field}
                            onClose={onClose}
                            anchorEl={this.state.popoverRef}
                            anchorReference="anchorEl"
                            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                            transformOrigin={{ horizontal: "center", vertical: "top" }}
                        >

                            <child.props.filterComponent onClose={onClose} />

                        </Popover>
                    </div>
                );
            }

            return null;
        };

        const headers = React.Children.map(children,
            child => {
                if (child) {

                    const { field, numeric, padding } = child.props;
                    let { cellClassName } = child.props;

                    if (typeof cellClassName === "function") {
                        cellClassName = "";
                    }

                    return (
                        <TableCell
                            key={field}
                            numeric={numeric}
                            className={classNames(classes.headerCell, cellsClassName, headersClassName, cellClassName)}
                            padding={padding} >

                            <div className={classes.tableHeader}>
                                {renderFilter(child)}

                                <TableHeaderLabel
                                    sortable={child.props.sortable}
                                    active={orderBy === field}
                                    direction={order}
                                    onClick={() => handleHeaderClick(child)}>

                                    {child.props.children}

                                </TableHeaderLabel>

                                {child.props.headerSuffix}

                            </div>

                        </TableCell>
                    );
                }

                return null;
            }
        );

        const rows = data.map(
            row => {
                let colsComponent;
                if (row.component) {
                    colsComponent = <row.component data={row} />;
                }
                else {
                    colsComponent = React.Children.map(children,
                        column => {
                            if (column) {
                                const { field, numeric, onRender, padding } = column.props;
                                let { cellClassName } = column.props;

                                if (typeof cellClassName === "function") {
                                    cellClassName = cellClassName(row);
                                }

                                return (
                                    <TableCell numeric={numeric} padding={padding} className={classNames(cellsClassName, cellClassName)}>
                                        {onRender(row, field)}
                                    </TableCell>
                                );
                            }

                            return null;
                        }
                    );
                }


                return (
                    <TableRow hover tabIndex="-1" key={row[columnKey]}>
                        {colsComponent}
                    </TableRow>
                );
            }
        );

        return (
            <Table className={className}>
                <TableHead>
                    <TableRow>
                        {headers}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(DataTable);
