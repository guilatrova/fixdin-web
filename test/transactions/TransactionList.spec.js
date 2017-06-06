import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
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
            { id: 1, value: '10', due_date: moment(new Date()) },
            { id: 2, value: '11', due_date: moment(new Date()) },
            { id: 3, value: '12', due_date: moment(new Date()) },
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

    it('should calls onDelete', () => {
        let deleteSpy = sinon.spy();

        const wrapper = mount(<TransactionList {...defaultProps} transactions={transactions} onDelete={deleteSpy} />);

        wrapper.find('.delete-button').first().simulate('click');

        expect(deleteSpy.called).to.be.true;
        expect(deleteSpy.alwaysCalledWith(1)).to.be.true;
    })
    
})