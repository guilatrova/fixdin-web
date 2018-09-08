import React from 'react';

import ActionableTableWrapper from '../../../common/components/ActionableTableWrapper';
import TransferTable from '../components/TransferTable';

const TransferTableContainer = ({ ...props }) => {
    return (
        <ActionableTableWrapper title="TRANSFERÊNCIAS">
            <TransferTable {...props} />
        </ActionableTableWrapper>
    );
};

TransferTableContainer.propTypes = {
    ...TransferTable.propTypes
};

export default TransferTableContainer;
