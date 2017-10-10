import { Step1 } from './Step1';

describe('PaymentOrder <Step1 />', () => {
    const props = {
        classes: { root: "" },
        incomes: [],
        onChange: () => {}
    }

    const yesterday = moment(new Date(Date.now() - 864e5));
    const today = moment(new Date());
    const tomorrow = moment(new Date(Date.now() + 864e5));

    it('renders ok', () => {
        const wrapper = shallow(<Step1 {...props} />);
        expect(wrapper).to.be.ok;
    })

    it('getDefaultIncomesToBeChecked()', () => {
        const wrapper = shallow(<Step1 {...props} />)        
        const incomes = [ 
            { id: 1, due_date: yesterday },
            { id: 2, due_date: today },
            { id: 3, due_date: tomorrow}
        ]

        const checked = wrapper.instance().getDefaultIncomesToBeChecked(incomes);

        expect(checked).to.deep.equal([ 2, 3 ]);
    });

    it('getIncomesUntil()', () => {
        const wrapper = shallow(<Step1 {...props} />)        
        const incomes = [ 
            { id: 1, due_date: yesterday },
            { id: 2, due_date: today },
            { id: 3, due_date: tomorrow}
        ]

        wrapper.setState({ untilDate: today });
        const visible = wrapper.instance().getIncomesUntil(incomes);
        
        expect(visible).to.deep.equal([ incomes[0], incomes[1] ]);
    });

})