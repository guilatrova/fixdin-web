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

    handleSubmit = () => this.props.onSubmit(this.state.kind);

    render() {
        return (
            <div>
                <Select 
                    placeholder="Tipo"
                    value={this.state.kind}
                    onChange={(kind) => this.setState({ kind })}
                    options={kindOptions}
                />

                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        kind: selectors.getFilters(state).kind || ALL
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