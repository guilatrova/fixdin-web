import { expect } from 'chai';

export function itShouldDisplayErrorForField(wrapper, field, controlId, message) {

    it(`should display error for ${field}`, () => {

        const errors = {
            [field]: message
        }
        wrapper.setProps({errors});
        const formGroup = wrapper.find(`FormGroup[controlId="${controlId}"]`);

        expect(formGroup.props().validationState).to.be.equal('error');
        expect(wrapper.contains(
            message
        )).to.be.true;
    })
    
}

export function itShouldPassErrorMessageTo(wrapper, field, state = undefined) {
    
    it(`should pass error message to ${field}`, () => {
        const errors = {
            [field]: `invalid ${field}`
        };
        wrapper.setProps({errors});
        if (state)
            wrapper.setState(state);

        expect((wrapper).find(`HorizontalFormGroupError[id="${field}"]`).prop('error')).to.be.equal(errors[field]);
    })
}

export function fillAllRequiredFields(inputChangeTrigger, requiredFields, fieldsValue = {}) {
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]; 
        const value = fieldsValue[field] || 'any';                
        simulateChange(inputChangeTrigger, field, value);
    }
}

export function itSubmitButtonShouldBeDisabledWhenFieldIsBlank(wrapper, triggerReference, requiredFields, field, howToFindButton = 'Button[type="submit"]') {

    it (`submit button should be disabled when ${field} is blank `, () => {        
        const input = wrapper.find(triggerReference);

        for (let i = 0; i < requiredFields.length; i++) {
            if (requiredFields[i] != field) {
                simulateChange(input, requiredFields[i], 'any');
            }
            else {
                simulateChange(input, requiredFields[i], '');
            }
        }

        expect(wrapper.find(howToFindButton).prop('disabled')).to.be.true;
    });

}

export function simulateChange(input, name, value) {
    input.simulate('change', { target: { name, value }});
}