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

class IntegrationReactSelect extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        })).isRequired,
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        isMulti: PropTypes.bool,
        creatable: PropTypes.bool
    };

    render() {
        const { classes, theme, label, creatable, ...props } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
            }),
        };

        const SelectComponent = creatable ? Creatable : Select;

        return (
            <NoSsr>
                <SelectComponent
                    classes={classes}
                    styles={selectStyles}
                    components={components}
                    textFieldProps={{
                        label: label,
                        InputLabelProps: {
                            shrink: !!label,
                        },
                    }}
                    {...props}
                />
            </NoSsr>
        );
    }
}

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
