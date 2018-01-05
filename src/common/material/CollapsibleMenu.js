import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class CollapsibleMenu extends React.Component {
    static propTypes = {
        children: PropTypes.node
    };

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
                <IconButton aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                >
                    {Children}
                </Menu>
            </div>
        );
    }
}

export default CollapsibleMenu;