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

export function fillAllRequiredFields(inputChangeTrigger, requiredFields, fieldsValue = {}) {
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]; 
        const value = fieldsValue[field] || 'any';                
        simulateChange(inputChangeTrigger, field, value);
    }
}

export function itSubmitButtonShouldBeDisabledWhenFieldIsBlank(wrapper, triggerReference, requiredFields, field) {

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

        expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.true;
    });

}

export function simulateChange(input, name, value) {
    input.simulate('change', { target: { name, value }});
}