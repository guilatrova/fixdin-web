import React from 'react';
import cn from 'classnames';

import Tab from '@material-ui/core/Tab';

const CustomTab = ({ classes, ...remainingProps }) => {
    return (
        <Tab
            classes={{ selected: cn("tab-selected", "arrow-parent"), ...classes }}
            {...remainingProps}
        />
    );
};

CustomTab.propTypes = Tab.propTypes;

export default CustomTab;
