import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

//'#FB5100'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff843b',
            main: '#fb5100',
            dark: '#c01100',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fff',
            main: '#fff',
            dark: '#ababab',
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