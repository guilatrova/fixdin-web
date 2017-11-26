import reducer from './signupReducer';
import actions from '../actions';

describe('users/duck/reducers/signup', () => {
    const initialState = {
        isFetching: false,
        errors: {}
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    });

    it('should handle SIGNUP', () => {
        expect(
            reducer(undefined, actions.requestSignup())
        ).to.deep.equal({
            isFetching: true,
            errors: {}
        });
    });

    it('should handle successful SIGNUP', () => {
        expect(
            reducer(undefined, actions.receiveSignup('success', {}))
        ).to.deep.equal({
            isFetching: false,
            errors: {}
        });
    });

    it('should handle failed SIGNUP', () => {
        const errors = {
            email: 'invalid address',
            password: 'too short'
        };

        expect(
            reducer(undefined, actions.receiveSignup('fail', errors))
        ).to.deep.equal({
            isFetching: false,                
            errors
        });
    });
});