import React from 'react';
import Button from 'material-ui/Button';

const fabStyle = {
    // position: 'fixed',
    // right: '18px',
    // bottom: '15px'
    float: 'right'
};

const FloatingActionButton = ({ color, onClick, children }) => {
    return (
        <Button fab color={color} onClick={onClick} style={fabStyle}>
            {children}
        </Button>
    );
}

export default FloatingActionButton;