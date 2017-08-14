import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

export default class TableSort extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        key: PropTypes.string.isRequired,
        children: PropTypes.node,
        initialOrder: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
        initialOrderBy: PropTypes.string.isRequired
    }

    static defaultProps = {
        key: 'id',
        initialOrder: 'asc',
        initialOrderBy: ''
    }

    constructor(props) {
        super(props);

        this.state = {
            order: props.initialOrder,
            orderBy: props.initialOrderBy,
            data: props.data
        }
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

    render () {
        const { key, children } = this.props;
        const { order, orderBy } = this.state;
        const handleHeaderClick = this.handleHeaderClick;
        const data = this.sort(this.state.orderBy, this.state.order);

        const headers = React.Children.map(children,
            child => {
                if (child) {

                    const { field, numeric } = child.props;                

                    return (
                        <TableCell
                            key={field}
                            numeric={numeric} >

                            <TableSortLabel
                                active={orderBy === field}
                                direction={order}
                                onClick={() => handleHeaderClick(child)}>

                                {child.props.children}

                            </TableSortLabel>
                        </TableCell>
                    )
                }

                return null;
            }
        );
                
        const rows = data.map(
            row => {
                return (
                    <TableRow hover tabIndex="-1" key={row[key]}>

                        {React.Children.map(children, 
                            column => {
                                if (column) {
                                    const { field, numeric, disablePadding, onRender } = column.props;

                                    return (
                                        <TableCell numeric={numeric} disablePadding={disablePadding}>
                                            {onRender(row, field)}
                                        </TableCell>
                                    );
                                }

                                return null;
                            }
                        )}

                    </TableRow>
                )
            }
        );

        return (
            <Table>
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