import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import CPFLSettings from './../components/CPFLSettings';
import { selectors, operations } from './../duck';

class CPFLSettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            documento: "",
            imovel: ""
        };
    }

    componentDidMount() {
        this.props.fetch();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.settings.cpfl_settings[0].name,
            documento: nextProps.settings.cpfl_settings[0].documento,
            imovel: nextProps.settings.cpfl_settings[0].imovel
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
        this.props.save(data);
    }

    handleRun = () => {
        this.props.run();
    }

    render() {
        const { name, documento, imovel } = this.state;
        const { errors } = this.props;
        return (
            <div>
                <CPFLSettings name={name} documento={documento} imovel={imovel} 
                    onChange={this.handleChange} errors={errors} />

                <Button raised onClick={this.handleSave}>Salvar</Button>
                <Button raised onClick={this.handleRun}>Sincronizar</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: selectors.getSettings(state),
        errors: selectors.getErrors(state),
        isFetching: selectors.isFetching(state),
        lastHistory: selectors.getLastHistory(state)
    }    
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => dispatch(operations.fetchSettings()),
        save: (data) => dispatch(operations.updateSettings(data)),
        run: () => dispatch(operations.runService())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPFLSettingsPage);