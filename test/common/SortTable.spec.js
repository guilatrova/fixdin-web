import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import TableSort from './../../src/common/components/material/TableSort';
import DataColumn from './../../src/common/components/material/DataColumn';
import { TableRow } from 'material-ui/Table';

describe('TableSort', () => {
    const defaultProps = {
        data: [
            { id: 1, otherId: 10, alpha: 'abc', numeric: 1 }
        ]
    };

    it('renders ok', () => {
        const wrapper = shallow(<TableSort {...defaultProps} />);
        expect(wrapper).to.be.ok;
    });

    it('accepts custom key', () => {
        const wrapper = shallow(<TableSort {...defaultProps} key='anotherId' />);
        expect(wrapper.containsMatchingElement(<TableRow key="10" />)).to.be.true;
    });
    
});