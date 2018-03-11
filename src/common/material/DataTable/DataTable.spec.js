import DataTable from './DataTable';

describe('<DataTable />', () => {
    const defaultProps = {
        data: [
            { id: 1, otherId: 10, alpha: 'abc', numeric: 1 }
        ]
    };

    it('renders ok', () => {
        const wrapper = shallow(<DataTable {...defaultProps} />);
        expect(wrapper).to.be.ok;
    });
    
});