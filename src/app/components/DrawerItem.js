import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/List';

const DrawerItem = ({ icon, text, to, onClick }) => {
    return (
        <Link to={to} onClick={onClick}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                
                <ListItemText primary={text} />
            </ListItem>    
        </Link>
    );
};

DrawerItem.propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default DrawerItem;