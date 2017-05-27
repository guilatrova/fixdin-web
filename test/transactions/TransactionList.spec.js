import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

import TransactionList from './../../src/transactions/components/TransactionList';

describe('TransactionList', () => {

    const defaultProps = {
        onRefresh: () => {},
        onEdit: () => {},
        isFetching: false,
        kind: 'income',
        transactions: [],            
    }

    const transactions = [
            { id: 1, value: '10' },
            { id: 2, value: '11' },
            { id: 3, value: '12' },
        ]

    it('renders ok', () => {
        const wrapper = shallow(<TransactionList {...defaultProps} />);
        expect(wrapper).to.be.ok;
    })

    it('should render transactions in table', () => {
        const wrapper = shallow(<TransactionList {...defaultProps} transactions={transactions} />);
        expect(wrapper.find('tr').length).to.equal(4); //1 TH + 3 TRs
    })

    it('should calls onEdit', () => {
        let editSpy = sinon.spy();

        const wrapper = mount(<TransactionList {...defaultProps} transactions={transactions} onEdit={editSpy} />);

        wrapper.find('.edit-button').first().simulate('click');

        expect(editSpy.called).to.be.true;
        expect(editSpy.alwaysCalledWith(1)).to.be.true;
    })
    
})