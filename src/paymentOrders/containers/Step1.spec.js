import { Step1 } from './Step1';

xdescribe('PaymentOrder <Step1 />', () => {
    const props = {
        classes: { root: "" },
        currentBalance: 10,
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
        const wrapper = shallow(<Step1 {...props} />);
        const incomes = [ 
            { id: 1, due_date: yesterday },
            { id: 2, due_date: today },
            { id: 3, due_date: tomorrow}
        ]

        const checked = wrapper.instance().getDefaultIncomesToBeChecked(incomes);

        expect(checked).to.deep.equal([ 2, 3 ]);
    });

    it('getIncomesUntil()', () => {
        const wrapper = shallow(<Step1 {...props} />);
        const incomes = [ 
            { id: 1, due_date: yesterday },
            { id: 2, due_date: today },
            { id: 3, due_date: tomorrow}
        ]

        wrapper.setState({ untilDate: today });
        const visible = wrapper.instance().getIncomesUntil(incomes);
        
        expect(visible).to.deep.equal([ incomes[0], incomes[1] ]);
    });

    describe('getSum()', () => {

        const incomes = [ 
            { id: 1, due_date: yesterday, value: 10 },
            { id: 2, due_date: today, value: 10 },
            { id: 3, due_date: tomorrow, value: 5 }
        ]

        it('getSum([1, 2])', () => {
            const wrapper = shallow(<Step1 {...props} currentBalance={10} />);
            wrapper.setState({ visibleIncomes: incomes, valueToSave: "R$ 10,00" });

            const result = wrapper.instance().getSum([ 1 ]);

            expect(result).to.deep.equal({
                totalChecked: 10,
                total: 10
            });
        });

        it('getSum([1, 2], incomes)', () => {
            const wrapper = shallow(<Step1 {...props} currentBalance={10} />);
            wrapper.setState({ valueToSave: "R$ 10,00" });

            const result = wrapper.instance().getSum([ 1, 2, 3 ], incomes);

            expect(result).to.deep.equal({
                totalChecked: 25,
                total: 25
            });
        });

        it('getSum([ 1, 2 ], incomes, "R$ 10,00")', () => {
            const wrapper = shallow(<Step1 {...props} currentBalance={10} />);

            const result = wrapper.instance().getSum([ 1, 2 ], incomes, 'R$ 10,00');

            expect(result).to.deep.equal({
                totalChecked: 20,
                total: 20
            });
        });        

    });

    describe('updates sum', () => {

        let wrapper, getSumSpy;

        beforeEach(() => {
            wrapper = shallow(<Step1 {...props} />)
            getSumSpy = sinon.spy(wrapper.instance(), 'getSum');
        });

        it('when change valueToSave', () => {
            wrapper.instance().handleValueToSaveChange(10);

            expect(wrapper.state('valueToSave')).to.equal(10);
            expect(getSumSpy.called).to.be.true;
        });

        it('when checks a new item', () => {
            wrapper.instance().handleToggle(15);

            expect(wrapper.state('checked')).to.deep.equal([ 15 ]);
            expect(getSumSpy.called).to.be.true;
        });

        it('when props are updated', () => {
            wrapper.setProps({ ...props, incomes: [ { id: 1, due_date: moment(new Date()) } ] })

            expect(getSumSpy.called).to.be.true;
        });

    });

    describe('checks default', () => {

        let wrapper, getDefaultIncomesToBeCheckedSpy;
        
        beforeEach(() => {
            wrapper = shallow(<Step1 {...props} />)
            getDefaultIncomesToBeCheckedSpy = sinon.spy(wrapper.instance(), 'getDefaultIncomesToBeChecked');
        });

        it('when props are updated', () => {
            wrapper.setProps({ ...props, incomes: [ { id: 1, due_date: moment(new Date()) } ] })

            expect(getDefaultIncomesToBeCheckedSpy.called).to.be.true;
        });

    });

})