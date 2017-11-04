import TransactionForm from './TransactionForm';

describe('<TransactionForm />', () => {    
    
    const defaultProps = { 
        onSubmit: () => {},
        isFetching: false,
    }
    const submitButton = '#transaction-form-save-dropdown';

    describe('in any mode', () => {        

        const requiredFields = ["due_date", "value", "description", "category"];
        const triggerReference = 'HorizontalFormGroupError[id="deadline"]';
        const form = new ComponentsTestHelper(
            () => shallow(<TransactionForm {...defaultProps} />),
            requiredFields,
            triggerReference
        );

        it('renders ok', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        form.itShouldPassErrorMessageTo('due_date');
        form.itShouldPassErrorMessageTo('value');
        form.itShouldPassErrorMessageTo('description');
        form.itShouldPassErrorMessageTo('category');
        form.itShouldPassErrorMessageTo('deadline');
        form.itShouldPassErrorMessageTo('priority');
        form.itShouldPassErrorMessageTo('details');
        form.itShouldPassErrorMessageTo('payment_date', { payed: true});
        
        form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('username', submitButton);
        form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('due_date', submitButton);
        form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('value', submitButton);
        form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('description', submitButton);
        form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('category', submitButton);

        it('submit button should be disabled when due_date is invalid', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);            
            const input = wrapper.find(triggerReference);
            
            fillAllRequiredFields(input, requiredFields);

            expect(wrapper.find(submitButton).prop('disabled')).to.be.true;
        })

        xit('submit button should be enabled when required fields are correctly filled', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);            
            const input = wrapper.find(triggerReference);

            fillAllRequiredFields(input, requiredFields, { due_date: moment(new Date())});

            expect(wrapper.find(submitButton).prop('disabled')).to.be.false;
        })

        it('submit button is disabled when isFetching', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} isFetching={true} />);            
            const input = wrapper.find(triggerReference);

            fillAllRequiredFields(input, requiredFields);

            expect(wrapper.find(submitButton).prop('disabled')).to.be.true;
        })

        it('should calls onSubmit', () => {
            let submitSpy = sinon.spy();

            const wrapper = shallow(<TransactionForm {...defaultProps} onSubmit={submitSpy} />);
            
            wrapper.find(submitButton).simulate('click');

            expect(submitSpy.called).to.be.true;
        })
    })

    describe('in Edit mode', () => {
        const editingTransaction = {
            id: 1,
            account: 2,
            due_date: moment(new Date(2017, 3, 3)),
            description: 'editing this',
            category: '1',
            value: '15,00',
            details: 'more details'
        }

        it('starts with transaction data filled in', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} transaction={editingTransaction} />);

            const state = wrapper.state();

            for (let prop in editingTransaction) {
                if (editingTransaction.hasOwnProperty(prop)) {
                    expect(state[prop]).to.equal(editingTransaction[prop]);
                }
            }

        })
    })

})