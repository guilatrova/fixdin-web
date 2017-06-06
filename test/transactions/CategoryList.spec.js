import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import CategoryList from './../../src/categories/components/CategoryList';

describe('CategoryList', () => {

    const defaultProps = {
        categories: [
            { id: 1, name: 'Car' },
            { id: 2, name: 'Oi' }
        ]
    }

    it('renders ok', () => {
        const wrapper = shallow(<CategoryList {...defaultProps} />)
        expect(wrapper).to.be.ok;
    })

    it('should render categories in table', () => {
        const wrapper = shallow(<CategoryList {...defaultProps} />)
        expect(wrapper.find('tr').length).to.equal(3); //1 TH + 2 TRs
    })
})