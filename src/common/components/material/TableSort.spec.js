import TableSort from './TableSort';
import { TableRow } from 'material-ui/Table';

describe('<TableSort />', () => {
    const defaultProps = {
        data: [
            { id: 1, otherId: 10, alpha: 'abc', numeric: 1 }
        ]
    };

    it('renders ok', () => {
        const wrapper = shallow(<TableSort {...defaultProps} />);
        expect(wrapper).to.be.ok;
    });
    
});