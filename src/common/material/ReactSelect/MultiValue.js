/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

import Chip from '@material-ui/core/Chip';

const MultiValue = (props) => {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={event => {
                props.removeProps.onClick();
                props.removeProps.onMouseDown(event);
            }}
        />
    );
};

export default MultiValue;
