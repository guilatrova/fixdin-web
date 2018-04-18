import reducer from './reducers';
// import actions from './actions';

describe('balances/duck/reducers', () => {

    const initialState = {
        plain: [],
        detailed: [],
        detailedAccounts: [],
        isFetching: false,
        errors: {},
    };

    // const fetchingState = {
    //     ...initialState,
    //     isFetching: true
    // };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

});