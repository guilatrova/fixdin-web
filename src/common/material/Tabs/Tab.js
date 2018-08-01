import React from 'react';

import Tab from '@material-ui/core/Tab';

const CustomTab = ({ classes, ...remainingProps }) => {
    return (
        <Tab
            classes={{ selected: "tab-selected", ...classes }}
            {...remainingProps}
        />
    );
};

CustomTab.propTypes = Tab.propTypes;

export default CustomTab;
