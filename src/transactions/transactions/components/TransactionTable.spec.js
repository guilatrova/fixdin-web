import TransactionTable from './TransactionTable';

describe('<TransactionTable />', () => {

    const defaultProps = {
        onRefresh: () => {},
        onEdit: () => {},
        onCopy: () => {},
        isFetching: false,
        kind: 'income',
        transactions: [],
        categories: [
            { undefined: 'any' }
        ]
    }

    const transactions = [
            { id: 1, value: 10, due_date: moment(new Date()) },
            { id: 2, value: -11, due_date: moment(new Date()) },
            { id: 3, value: 12, due_date: moment(new Date()) },
        ]

    it('renders ok', () => {
        const wrapper = shallow(<TransactionTable {...defaultProps} />); //using mount to force render child table
        expect(wrapper).to.be.ok;
    });

    it('should render transactions in table', () => {
        const wrapper = mount(<TransactionTable {...defaultProps} transactions={transactions} />);
        expect(wrapper.find('tr').length).to.equal(4); //1 TH + 3 TRs
    });
    
    describe('sorts', () => {

        const wrapper = shallow(<TransactionTable {...defaultProps} />);
        const instance = wrapper.instance();

        describe('value', () => {

            it('asc', () => {
                expect(instance.sortValue("150", "200", 'asc')).to.be.lessThan(0);
                expect(instance.sortValue("200", "150", 'asc')).to.be.greaterThan(0);
            });

            it('desc', () => {
                expect(instance.sortValue("150", "200", 'desc')).to.be.greaterThan(0);
                expect(instance.sortValue("200", "150", 'desc')).to.be.lessThan(0);
            });

            it('with decimals', () => {
                expect(instance.sortValue("150.15", "150.16", 'asc')).to.be.lessThan(0);
                expect(instance.sortValue("150.16", "150.15", 'asc')).to.be.greaterThan(0);
            });

            it('regardless of signal', () => {
                expect(instance.sortValue("150", "-200", "asc")).to.be.lessThan(0);
            });

        });

        describe('category', () => {

            const categories = [
                { id: 1, name: 'A' },
                { id: 2, name: 'a' },
                { id: 3, name: 'B' },
                { id: 4, name: 'b' },
            ];
            const wrapper = shallow(<TransactionTable {...defaultProps} categories={categories} />);
            const instance = wrapper.instance();

            it('asc', () => {
                expect(instance.sortCategory(1, 3, 'asc')).to.be.lessThan(0);
                expect(instance.sortCategory(3, 1, 'asc')).to.be.greaterThan(0);
            });

            it('desc', () => {
                expect(instance.sortCategory(1, 3, 'desc')).to.be.greaterThan(0);
                expect(instance.sortCategory(3, 1, 'desc')).to.be.lessThan(0);
            });

            it('regardless of casing', () => {
                expect(instance.sortCategory(2, 3, 'asc')).to.be.lessThan(0);
                expect(instance.sortCategory(3, 2, 'asc')).to.be.greaterThan(0);
            });            
        });

        describe('date', () => {

            const firstJanuary = moment('2017-01-01', 'YYYY-MM-DD');
            const secondJanuary = moment('2017-01-02', 'YYYY-MM-DD');

            it('asc', () => {
                expect(instance.sortDate(firstJanuary, secondJanuary, 'asc')).to.be.lessThan(0);
                expect(instance.sortDate(secondJanuary, firstJanuary, 'asc')).to.be.greaterThan(0);
            });

            it('desc', () => {
                expect(instance.sortDate(secondJanuary, firstJanuary, 'desc')).to.be.lessThan(0);
                expect(instance.sortDate(firstJanuary, secondJanuary, 'desc')).to.be.greaterThan(0);
            });

            it('with invalid date', () => {
                expect(instance.sortDate(firstJanuary, undefined, 'asc')).to.be.lessThan(0);
                expect(instance.sortDate(undefined, firstJanuary, 'asc')).to.be.greaterThan(0);
                expect(instance.sortDate(firstJanuary, undefined, 'desc')).to.be.greaterThan(0);
                expect(instance.sortDate(undefined, firstJanuary, 'desc')).to.be.lessThan(0);
            });
        });

    });

    describe('formats', () => {
        const categories = [ { id: 1, name:'a' } ];
        const wrapper = shallow(<TransactionTable {...defaultProps} categories={categories} />);
        const instance = wrapper.instance();
        const row = {
            category: 1,
            value: -10,
            date: moment('2014-08-22', 'YYYY-MM-DD')
        };

        it('value', () => {
            expect(instance.formatValue(row, 'value')).to.be.equal('R$ 10,00');
        });

        it('date', () => {
            expect(instance.formatDate(row, 'date')).to.be.equal('22/08/2014');
        });

        it('undefined date', () => {
            expect(instance.formatDate(row, 'undefined')).to.be.equal('NÃO PAGO');
        });

        it('category', () => {
            expect(instance.formatCategory(row, 'category')).to.be.equal('a');
        });

    });

})