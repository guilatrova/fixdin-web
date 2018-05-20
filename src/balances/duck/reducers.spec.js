import reducer from './reducers';

describe('balances/duck/reducers', () => {

    const initialState = {
        plain: [],
        detailed: [],
        detailedAccounts: [],
        periods: [],
        fetching: [],
        errors: {},
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

});