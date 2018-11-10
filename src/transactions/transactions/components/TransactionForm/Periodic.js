import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import DatePicker from '../../../../common/components/DatePicker';
import RadioButtonOption from '../../../../common/material/RadioButtonOption';
import finishOptions from './consts/periodicFinishesOptions';
import frequencies from './consts/periodicFrequencies';

const styles = {
    smallInput: {
        maxWidth: 60,
    },
    marginInput: {
        marginLeft: 10,
        marginRight: 10
    },
    formRow: {
        marginBottom: 10
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column'
    }
};


class Periodic extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        visible: PropTypes.bool,
        onChange: PropTypes.func
    }

    state = {
        frequency: "monthly",
        interval: "1",
        how_many: "",
        how_it_ends: finishOptions.ON_DATE,
        until: undefined
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value }, () => {
            this.props.onChange(this.state);
        });
    }

    handleHowItEndsChange = (key) => {
        if (key === finishOptions.ON_DATE) {
            this.setState({ how_many: "" });
        }
        else {
            this.setState({ how_many: "1", until: undefined });
        }
        this.handleChange("how_it_ends", key);
    }

    render() {
        const { classes, visible } = this.props;

        if (!visible)
            return null;

        return (
            <div>
                <div className={cn(classes.flex, classes.formRow)}>
                    <FormLabel component="legend">Repetir a cada</FormLabel>

                    <TextField
                        inputProps={{ style: { textAlign: "right" } }}
                        className={cn(classes.smallInput, classes.marginInput)}
                        value={this.state.interval}
                        type="number"
                        onChange={e => this.handleChange('interval', e.target.value)} />

                    <Select
                        name="frequency"
                        value={this.state.frequency}
                        onChange={e => this.handleChange('frequency', e.target.value)}
                        input={<Input id="input-frequency" />}
                    >
                        {frequencies.map(f => <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>)}

                    </Select>
                </div>

                <FormControl>
                    <FormLabel component="legend">Termina</FormLabel>

                    <div className={classes.flexCol}>

                        <RadioButtonOption name="periodic-finishes"
                            label="Em"
                            value={finishOptions.ON_DATE}
                            onClick={() => this.handleHowItEndsChange(finishOptions.ON_DATE)}
                            checked={this.state.how_it_ends == finishOptions.ON_DATE}
                        >

                            <DatePicker
                                value={this.state.until}
                                onChange={value => this.handleChange('until', value)}
                            />
                        </RadioButtonOption>

                        <RadioButtonOption name="periodic-finishes"
                            label="Após"
                            value={finishOptions.AFTER_TIMES}
                            onClick={() => this.handleHowItEndsChange(finishOptions.AFTER_TIMES)}
                            checked={this.state.how_it_ends == finishOptions.AFTER_TIMES}
                        >
                            <TextField
                                inputProps={{ style: { textAlign: "right" } }}
                                className={cn(classes.smallInput, classes.marginInput)}
                                value={this.state.how_many}
                                type="number"
                                onChange={e => this.handleChange('how_many', e.target.value)} />

                            vezes
                        </RadioButtonOption>

                    </div>

                </FormControl>

            </div>
        );
    }
}

export default withStyles(styles)(Periodic);
