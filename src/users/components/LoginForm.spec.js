import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
    
    const defaultProps = {
        isFetching: false,
        onSubmit: () => {},
        error: ''
    }
    const requiredFields = ["email", "password"];
    const triggerReference = 'FormControl[name="password"]';
    const form = new ComponentsTestHelper(
        () => shallow(<LoginForm {...defaultProps} />),
        requiredFields,
        triggerReference
    )
    
    it('renders ok', () => {
        const wrapper = shallow(<LoginForm {...defaultProps} />);
        expect(wrapper).to.be.ok;
    })
    
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('email');
    form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('password');
    
    it("submit button should be disabled when isFetching", () => {
        const wrapper = shallow(<LoginForm {...defaultProps} isFetching={true} />);
        expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.true;
    })
    
    it("submit button should be enabled when everything filled", () => {
        const wrapper = shallow(<LoginForm {...defaultProps} />);
        const input = wrapper.find(triggerReference);
        
        fillAllRequiredFields(input, requiredFields);
        
        expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.false;
    })
    
    it('should display error when any', () => {
        const error = 'This general error was generated' ;
        const wrapper = shallow(<LoginForm {...defaultProps} error={error} />);            
        expect(wrapper.find('Alert')).to.have.length(1);
        expect(wrapper.contains(
            error
        )).to.be.true;
    })
    
    it('should calls onSubmit', () => {            
        let submitPromise = sinon.stub().returnsPromise();
        submitPromise.resolves({ result: 'success '});
        
        const wrapper = mount(<LoginForm {...defaultProps} onSubmit={submitPromise} />);
        wrapper.find('form').simulate('submit');
        
        expect(submitPromise.called).to.be.true;
    })
});