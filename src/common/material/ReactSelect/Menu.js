/* eslint-disable react/prop-types */
import React from 'react';

import Paper from '@material-ui/core/Paper';

const Menu = (props) => {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
};

export default Menu;
