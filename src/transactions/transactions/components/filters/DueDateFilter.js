import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'material-ui/Button';
import { DatePicker } from 'material-ui-pickers';

import { selectors, operations } from '../../duck';

const defaultStart = () => moment().startOf('month');
const defaultEnd = () => moment().endOf('month');

class DueDateFilter extends React.Component {
    static propTypes = {
        due_date_from: PropTypes.object.isRequired,
        due_date_until: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            due_date_from: props.due_date_from,
            due_date_until: props.due_date_until
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            due_date_from: nextProps.due_date_from,
            due_date_until: nextProps.due_date_until
        });
    }

    handleChange = (name) => (value) => this.setState({ [name]: value });

    handleSubmit = () => this.props.onSubmit(this.state.due_date_from, this.state.due_date_until);

    handleClear = () => this.props.onSubmit(defaultStart(), defaultEnd());

    render() {
        return (
                <div>
                    <div>
                        <DatePicker
                            keyboard
                            label="De"                
                            value={this.state.due_date_from}
                            onChange={this.handleChange('due_date_from')}
                            autoOk={true}
                            format="DD MMMM YYYY" />
                    </div>

                    <div>
                        <DatePicker
                            keyboard
                            label="Até"
                            value={this.state.due_date_until}
                            onChange={this.handleChange('due_date_until')}
                            autoOk={true}
                            format="DD MMMM YYYY" />
                    </div>

                    <Button color="accent" onClick={this.handleClear}>Limpar</Button>
                    <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        due_date_from: selectors.getFilters(state).due_date_from || defaultStart(),
        due_date_until: selectors.getFilters(state).due_date_until || defaultEnd(),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (due_date_from, due_date_until) => {
            dispatch(operations.setFilters({ due_date_from, due_date_until }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DueDateFilter);