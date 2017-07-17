import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class CollapsibleMenu extends React.Component {
    state = {
        anchorEl: undefined,
        open: false,
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const Children = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                onClick: () => {
                    this.handleRequestClose();
                    child.props.onClick();                    
                }
            })
        );

        return (
            <div>
                <Button aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <MoreVertIcon />
                </Button>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {Children}
                </Menu>
            </div>
        );
    }
}

export default CollapsibleMenu;