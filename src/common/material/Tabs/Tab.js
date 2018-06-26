import React from 'react';

import Tab from '@material-ui/core/Tab';

const CustomTab = (props) => {
    return (
        <Tab
            classes={{ selected: "tab-selected" }}
            {...props}
        />
    );
};

CustomTab.propTypes = Tab.propTypes;

export default CustomTab;
