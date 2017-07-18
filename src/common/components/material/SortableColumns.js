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

function defaultOnRender(row, field) {
    return row[field];
}

function defaultOnSort(a, b, order) {
   if (order === 'desc') 
        return b > a;
    
    return a > b;
}

export class DataColumn extends React.Component {
    static propTypes = {
        children: PropTypes.string,
        field: PropTypes.string,
        onRender: PropTypes.func.isRequired,

        sortable: PropTypes.bool.isRequired,
        onSort: PropTypes.func.isRequired
    };

    static defaultProps = {
        sortable: false,
        onRender: defaultOnRender,
        onSort: defaultOnSort
    }
    
    render () {
        return null;
    }
}

export class SortableTable extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        key: PropTypes.string.isRequired
    }

    static defaultProps = {
        key: 'id'
    }

    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: '',
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
        const { field } = column.props;
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

        this.sort();
    }

    sort() {
        const { orderBy, order } = this.state;
        if (orderBy) {
            const sortFunc = React.Children.toArray(this.props.children).find(column => column.props.field == orderBy).props.onSort;

            this.setState({
                data: this.props.data.sort((a, b) => sortFunc(a[orderBy], b[orderBy], order))
            });
        }

        this.setState({ data: this.props.data });
    }

    render () {
        const { key, children } = this.props;
        const { order, orderBy, data } = this.state;
        const handleHeaderClick = this.handleHeaderClick;

        const headers = React.Children.map(children,
            child => {
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
        );
                
        const rows = data.map(
            row => {
                return (
                    <TableRow hover tabIndex="-1" key={row[key]}>

                        {React.Children.map(children, 
                            column => {
                                const { field, numeric, disablePadding, onRender } = column.props;

                                return (
                                    <TableCell numeric={numeric} disablePadding={disablePadding}>
                                        {onRender(row, field)}
                                    </TableCell>
                                );
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