describe('<CategoryForm />', () => {
    xit('MISSING');
});

// import { EXPENSE } from '../../shared/kinds';
// import CategoryForm from './CategoryForm';

// describe('<CategoryForm />', () => {
    
//     const defaultProps = { 
//         onSubmit: () => {},
//         isFetching: false,
//         errors: {}
//     };

//     xdescribe('in any mode', () => {

//         const requiredFields = ["name"];
//         const triggerReference = 'HorizontalFormGroupError[id="name"]';

//         it('renders ok', () => {
//             const wrapper = shallow(<CategoryForm {...defaultProps} />);
//             expect(wrapper).to.be.ok;
//         })

//         form.itShouldPassErrorMessageTo('name');

//         form.itSubmitButtonShouldBeDisabledWhenFieldIsBlank('name');

//         it('submit button should be disabled when isFetching', () => {
//             const wrapper = shallow(<CategoryForm {...defaultProps} isFetching={true} />);
//             const input = wrapper.find(triggerReference);

//             fillAllRequiredFields(input, requiredFields);

//             expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.true;
//         });
//     });

//     describe('in edit mode', () => {
//         const editingCategory = {
//             id: 2,
//             name: 'eating out',
//             kind: EXPENSE.id
//         };

//         it('should starts with category data filled in', () => {
//             const wrapper = shallow(<CategoryForm {...defaultProps} category={editingCategory} />);

//             expect(wrapper.state('name')).to.equal(editingCategory.name);
//         });
//     });

// })