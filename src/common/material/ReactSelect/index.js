import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Option from './Option';
import Control from './Control';
import NoOptionsMessage from './NoOptionsMessage';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import MultiValue from './MultiValue';
import ValueContainer from './ValueContainer';
import Menu from './Menu';

const styles = theme => ({
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        marginTop: theme.spacing.unit,
    },
});

const components = {
    Option,
    Control,
    NoOptionsMessage,
    Placeholder,
    SingleValue,
    MultiValue,
    ValueContainer,
    Menu,
};

const optionShape = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};

const IntegrationReactSelect = ({ classes, theme, label, creatable, isMulti, options, value, valueProp, onChange, ...props }) => {
    const SelectComponent = creatable ? Creatable : Select;

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
        }),
    };

    // Fix a bug regarding value type that must be string
    const fixedOptions = options.map(opt => ({ label: opt.label, value: opt.value.toString() }));
    const formatOption = opt => ({ label: opt.label, value: isNaN(opt.value) ? opt.value : Number(opt.value) });
    let fixValueOnChangeHandler;
    if (isMulti) {
        fixValueOnChangeHandler = opts => onChange(opts.map(opt => formatOption(opt)));
    }
    else {
        fixValueOnChangeHandler = opt => onChange(formatOption(opt));
    }

    // Allow primitive values (label or value) instead of a full option shape
    let selectedValue = value;
    if (isMulti) {
        selectedValue = options.filter(opt => value.includes(opt[valueProp]));
    }
    else {
        selectedValue = options.find(opt => opt[valueProp] == value);
    }

    return (
        <NoSsr>
            <SelectComponent
                isMulti={isMulti}
                classes={classes}
                styles={selectStyles}
                components={components}
                options={fixedOptions}
                value={selectedValue}
                textFieldProps={{
                    label: label,
                    InputLabelProps: {
                        shrink: !!label,
                    },
                }}
                onChange={fixValueOnChangeHandler}
                {...props}
            />
        </NoSsr>
    );
};

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string)
    ]),
    valueProp: PropTypes.oneOf(['value', 'label']).isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isMulti: PropTypes.bool,
    creatable: PropTypes.bool
};

IntegrationReactSelect.defaultProps = {
    valueProp: "value"
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
