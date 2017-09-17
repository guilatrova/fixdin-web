import CategoryList from './CategoryList';

describe('<CategoryList />', () => {

    const defaultProps = {
        categories: [
            { id: 1, name: 'Car' },
            { id: 2, name: 'Oi' }
        ]
    }

    it('renders ok', () => {
        const wrapper = shallow(<CategoryList {...defaultProps} />)
        expect(wrapper).to.be.ok;
    })

    it('should render categories in table', () => {
        const wrapper = shallow(<CategoryList {...defaultProps} />)
        expect(wrapper.find('tr').length).to.equal(3); //1 TH + 2 TRs
    })

    it('should calls onEdit', () => {
        let editSpy = sinon.spy();

        const wrapper = shallow(<CategoryList {...defaultProps} onEdit={editSpy} />);

        wrapper.find('.edit-button').first().simulate('click');

        expect(editSpy.called).to.be.true;
        expect(editSpy.alwaysCalledWith(1)).to.be.true;
    })

    it('should calls onDelete', () => {
        let deleteSpy = sinon.spy();

        const wrapper = shallow(<CategoryList {...defaultProps} onDelete={deleteSpy} />);

        wrapper.find('.delete-button').first().simulate('click');

        expect(deleteSpy.called).to.be.true;
        expect(deleteSpy.alwaysCalledWith(1)).to.be.true;
    });
})