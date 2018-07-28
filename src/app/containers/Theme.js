import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#981192',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            contrastText: '#000',
        },
    },
});

const FixdinTheme = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
};

FixdinTheme.propTypes = {
    children: PropTypes.node.isRequired
};

export default FixdinTheme;