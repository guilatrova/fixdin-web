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
        accent: {
            main: '#f95023'
        },
        background: {
            default: "#fff"
        }
    },
    typography: {
        fontFamily: [
            '"Segoe UI"'
        ].join(","),
        subheading: {
            fontSize: 16
        },
    },
    mixins: {
        orangeButton: {
            background: "#f95023",
            color: "#fff"
        },
        fab: {
            background: "#f95023",
            color: "#fff"
        }
    },
    overrides: {
        MuiTableCell: {
            body: {
                color: "#5b5b5a"
            }
        }
    }
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