import HorizontalFormGroupError from './HorizontalFormGroupError';

describe('HorizontalFormGroupError', () => {
    const defaultProps = {
        id: 'form',
        label: 'label'        
    }

    it('renders ok', () => {
        const wrapper = shallow(<HorizontalFormGroupError {...defaultProps} />);
        expect(wrapper).to.be.ok;        
    })

    it('should displays error when any', () => {
        const wrapper = shallow(<HorizontalFormGroupError {...defaultProps} error="any error displayed here" />);
        expect(wrapper.contains('any error displayed here')).to.be.true;
    })

    it('should renders children when any', () => {
        const wrapper = shallow(
            <HorizontalFormGroupError {...defaultProps}>
                <p>Child rendered</p>
            </HorizontalFormGroupError>
        );

        expect(wrapper.contains(<p>Child rendered</p>)).to.be.true;
    })
})