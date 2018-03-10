import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select';
import Button from 'material-ui/Button';

import { selectors, operations } from '../../duck';
import { ALL, EXPENSE, INCOME } from '../../../kinds';

const kindOptions = [ 
    { value: ALL, label: '-' },
    { value: INCOME,  label: 'Receitas' },
    { value: EXPENSE, label: 'Despesas' }
];

class KindFilter extends React.Component {
    static propTypes = {
        kind: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        kind: []
    };

    constructor(props) {
        super(props);

        this.state = {
            kind: props.kind
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ kind: nextProps.kind });
    }

    //Need to pass options below to keep UI in sync. We handle "value" prop in formatters
    handleSubmit = () => this.props.onSubmit(this.state.kind);

    handleClear = () => this.props.onSubmit(kindOptions[0]);

    render() {
        return (
            <div style={{width: 200}}>
                <Select 
                    placeholder="Tipo"
                    value={this.state.kind}
                    onChange={(kind) => this.setState({ kind })}
                    options={kindOptions}
                />

                <Button color="default" onClick={this.handleClear}>Limpar</Button>
                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        kind: selectors.getFilters(state).kind || kindOptions[0]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (kind) => {
            dispatch(operations.setFilters({ kind }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KindFilter);