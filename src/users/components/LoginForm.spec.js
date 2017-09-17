
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
    
    const requiredFields = ["email", "password"];
    const triggerReference = 'FormControl[name="password"]';
    
    it('renders ok', () => {
        const wrapper = shallow(<LoginForm />);
        expect(wrapper).to.be.ok;
    })        
    
    // itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<LoginForm />), triggerReference, requiredFields, 'email');
    // itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<LoginForm />), triggerReference, requiredFields, 'password');        
    
    it("submit button should be disabled when isFetching", () => {
        const wrapper = shallow(<LoginForm isFetching={true} />);
        expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.true;
    })
    
    it("submit button should be enabled when everything filled", () => {
        const wrapper = shallow(<LoginForm />);
        const input = wrapper.find(triggerReference);
        
        fillAllRequiredFields(input, requiredFields);
        
        expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.false;
    })
    
    it('should display error when any', () => {
        const error = 'This general error was generated' ;
        const wrapper = shallow(<LoginForm error={error} />);            
        expect(wrapper.find('Alert')).to.have.length(1);
        expect(wrapper.contains(
            error
        )).to.be.true;
    })
    
    // it('should calls onSubmit', () => {            
    //     let submitPromise = sinon.stub().returnsPromise();
    //     submitPromise.resolves({ result: 'success '});
        
    //     const wrapper = mount(<LoginForm onSubmit={submitPromise} />);
    //     wrapper.find('form').simulate('submit');
        
    //     expect(submitPromise.called).to.be.true;
    // })
});