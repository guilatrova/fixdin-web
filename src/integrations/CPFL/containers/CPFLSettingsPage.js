import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import CPFLSettings from './../components/CPFLSettings';
import { selectors, operations } from './../duck';

class CPFLSettingsPage extends React.Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        onRun: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired,

        settings: PropTypes.object,
        errors: PropTypes.object.isRequired
    }
    
    state = {
        name: "",
        documento: "",
        imovel: ""
    };

    componentDidMount() {
        this.props.onFetch();
    }

    componentWillReceiveProps(nextProps) {
        let settings = {};
        if (nextProps.settings && nextProps.settings.cpfl_settings && nextProps.settings.cpfl_settings.length > 0) {
            settings = nextProps.settings.cpfl_settings[0];
        }

        this.setState({
            name: settings.name,
            documento: settings.documento,
            imovel: settings.imovel
        });
    }

    handleChange = (val) => {
        this.setState(val);
    }

    handleSave = () => {
        const data = {
            enabled: true,
            cpfl_settings: [
                { name: this.state.name, documento: this.state.documento, imovel: this.state.imovel }
            ]
        };
        this.props.onSave(data);
    }

    handleRun = () => {
        this.props.onRun();
    }

    render() {
        const { name = "", documento = "", imovel = "" } = this.state;
        const { errors } = this.props;
        return (
            <div>
                <CPFLSettings name={name} documento={documento} imovel={imovel} 
                    onChange={this.handleChange} errors={errors} />

                <Button variant="raised" onClick={this.handleSave}>Salvar</Button>
                <Button variant="raised" onClick={this.handleRun}>Sincronizar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: selectors.getSettings(state),
        errors: selectors.getErrors(state),
        isFetching: selectors.isFetching(state),
        lastHistory: selectors.getLastHistory(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(operations.fetchSettings()),
        onSave: (data) => dispatch(operations.updateSettings(data)),
        onRun: () => dispatch(operations.runService())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CPFLSettingsPage);