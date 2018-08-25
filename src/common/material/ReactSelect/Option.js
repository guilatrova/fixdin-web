/* eslint-disable react/prop-types */
import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';

const Option = (props) => {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
};

export default Option;
