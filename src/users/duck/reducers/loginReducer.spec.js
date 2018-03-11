import reducer from './loginReducer';
import actions from '../actions';

describe('users/duck/reducers/login', () => {
    const initialState = {
            isFetching: false,
            error: '',
            token: ''
        };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

    it('should handle FETCH_TOKEN', () => {
        expect(
            reducer(undefined, actions.requestToken({}))
        ).toEqual({                
            isFetching: true,
            error: '',
            token: ''
        });
    });

    it('should handle successful FETCH_TOKEN', () => {
        expect(
            reducer(undefined, actions.receiveToken('success', 'abc123'))
        )
        .toEqual({
            isFetching: false,
            error: '',
            token: 'abc123'
        });
    });

    it('should handle failed FETCH_TOKEN', () => {
        expect(
            reducer(undefined, actions.receiveToken('fail', 'General error'))
        ).toEqual({
            isFetching: false,
            error: 'General error',
            token: ''
        });
    });

});