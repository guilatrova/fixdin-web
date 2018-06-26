import React from 'react';

import Tabs from '@material-ui/core/Tabs';

const CustomTabs = (props) => {
    return (
        <Tabs
            classes={{ root: "tabs-root", scroller: "tabs-scroller" }}
            indicatorColor="primary"
            {...props}
        />
    );
};

CustomTabs.propTypes = Tabs.propTypes;

export default CustomTabs;
