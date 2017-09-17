import SignupForm from './SignupForm';

describe('<SignupForm />', () => {
    
    const requiredFields = ["username", "first_name", "last_name", "email", "password"];
    const triggerReference = 'FormControl[name="username"]';
    const defaultProps = {
        onSubmit: () => {},
        isFetching: false,
        errors: {}
    }
    const form = new ComponentsTestHelper(
        () => shallow(<SignupForm {...defaultProps} />),
        requiredFields,
        triggerReference
    )
    
    describe('renders ok', () => {
        const wrapper = shallow(<SignupForm {...defaultProps} />);
        expect(wrapper).to.be.ok;
    })
    
    form.itShouldDisplayErrorForField('username', 'usernameGroup', 'username already in use');
    form.itShouldDisplayErrorForField('first_name', 'firstNameGroup', 'first name is required');
    form.itShouldDisplayErrorForField('last_name', 'lastNameGroup', 'last name is required');
    form.itShouldDisplayErrorForField('email', 'emailAddressGroup', 'Email invalid. How we would send you spam?');
    form.itShouldDisplayErrorForField('password', 'passwordGroup', 'password is too short');          
    
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('username');
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('email');
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('password');
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('first_name');
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('last_name');
    
    it('submit button should be disabled when isFetching', () => {
        const wrapper = shallow(<SignupForm {...defaultProps} isFetching={true} />);
        const input = wrapper.find(triggerReference);
        
        fillAllRequiredFields(input, requiredFields);
        
        expect(wrapper.find('Button').prop('disabled')).to.be.true;
    })
    
    it('submit button should be enabled when required fields are correctly filled', () => {
        const wrapper = shallow(<SignupForm {...defaultProps} />);            
        const input = wrapper.find(triggerReference);
        
        fillAllRequiredFields(input, requiredFields);
        
        const submitButton = wrapper.find('Button[type="submit"]');
        expect(submitButton.prop('disabled')).to.be.false;
    })
    
    it('should calls OnSubmit', () => {
        let submitPromise = sinon.stub().returnsPromise();
        submitPromise.resolves({ result: 'success '});
        
        const wrapper = mount(<SignupForm {...defaultProps} onSubmit={submitPromise} />);
        wrapper.find('form').simulate('submit');
        
        expect(submitPromise.called).to.be.true;
    })
})