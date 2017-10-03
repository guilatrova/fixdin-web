import { TransactionPage } from './TransactionPage';
import { types } from '../duck';
import { INCOME, EXPENSE } from '../../kinds';

describe('<TransactionPage />', () => {

    const transactions = [ { id: 1, periodic_transaction: 1, kind: EXPENSE.id }, { id: 2, periodic_transaction: 1, kind: EXPENSE.id }];
    const props = {
        transactions,
        editingTransaction: {},
        errors: {}
    }

    it('renders ok', () => {
        const wrapper = shallow(<TransactionPage {...props} />);
        expect(wrapper).to.be.ok;        
    })

    it('handleDelete()', () => {        
        const wrapper = shallow(<TransactionPage {...props} />);
        wrapper.instance().handleDelete(2);
        
        expect(wrapper.state().showTransactionDeleteModal).to.be.true;
        expect(wrapper.state().toDeleteId).to.equal(2);
        expect(wrapper.state().toDeletePeriodicTransaction).to.be.equal(1);
    });

    describe('handleConfirmDelete()', () => {

        it('for DELETE_ALL_PERIODIC_TRANSACTIONS type', () => {
            const onDeleteStub = sinon.stub().returnsPromise().resolves({
                result: 'success'
            });
            const wrapper = shallow(<TransactionPage {...props} onDelete={onDeleteStub} />);
            wrapper.setState({ toDeletePeriodicTransaction: 1 });
            wrapper.instance().handleConfirmDelete(types.DELETE_ALL_PERIODIC_TRANSACTIONS);

            expect(onDeleteStub.calledWith(1, EXPENSE, types.DELETE_ALL_PERIODIC_TRANSACTIONS)).to.be.true;
            expect(wrapper.state().showTransactionDeleteModal).to.be.false;
            expect(wrapper.state().toDeleteId).to.be.undefined;
            expect(wrapper.state().toDeletePeriodicTransaction).to.be.undefined;
        })

        it('for other types', () => {
            const onDeleteStub = sinon.stub().returnsPromise().resolves({
                result: 'success'
            });
            const wrapper = shallow(<TransactionPage {...props} onDelete={onDeleteStub} />);
            wrapper.setState({ toDeleteId: 2 });
            wrapper.instance().handleConfirmDelete('other type');

            expect(onDeleteStub.calledWith(2, EXPENSE, 'other type')).to.be.true;
            expect(wrapper.state().showTransactionDeleteModal).to.be.false;
            expect(wrapper.state().toDeleteId).to.be.undefined;
            expect(wrapper.state().toDeletePeriodicTransaction).to.be.undefined;
        })

    });

    xit('handleTransactionFormSubmit()', () => {

    });

    xit('handleFilter()');

});