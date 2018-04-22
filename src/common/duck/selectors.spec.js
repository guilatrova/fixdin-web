import selectors from './selectors';

const createCollection = (items) => ({ fetching: items });

describe('common/duck/selectors', () => {
    describe('isFetching', () => {
        it('returns true if any is fetching', () => {
            const collection = createCollection(["anything"]);
            expect(selectors.isFetching(collection)).toBeTruthy();
        });

        it('returns false if empty', () => {
            const collection = createCollection([]);
            expect(selectors.isFetching(collection)).toBeFalsy();
        });

        it('returns true to match specific item', () => {
            const collection = createCollection(["something"]);
            expect(selectors.isFetching(collection, "something")).toBeTruthy();
        });

        it('returns false to match specific item', () => {
            const collection = createCollection(["something"]);
            expect(selectors.isFetching(collection, "some other thing")).toBeFalsy();
        });
    });
});