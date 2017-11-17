import CategoryTable from './CategoryTable';

describe('<CategoryTable />', () => {

    const defaultProps = {
        categories: [
            { id: 1, name: 'Car' },
            { id: 2, name: 'Oi' }
        ],
        onEdit: () => {},
        onDelete: () => {}
    };

    it('renders ok', () => {
        const wrapper = shallow(<CategoryTable {...defaultProps} />)
        expect(wrapper).to.be.ok;
    });

    xit('should calls onEdit', () => {
        let editSpy = jest.fn();

        const wrapper = shallow(<CategoryTable {...defaultProps} onEdit={editSpy} />);

        wrapper.find('.edit-button').first().simulate('click');

        expect(editSpy.called).to.be.true;
        expect(editSpy.alwaysCalledWith(1)).to.be.true;
    });

    xit('should calls onDelete', () => {
        let deleteSpy = jest.fn();

        const wrapper = shallow(<CategoryTable {...defaultProps} onDelete={deleteSpy} />);

        wrapper.find('.delete-button').first().simulate('click');

        expect(deleteSpy.called).to.be.true;
        expect(deleteSpy.alwaysCalledWith(1)).to.be.true;
    });
});