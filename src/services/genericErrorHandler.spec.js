import handleError from './genericErrorHandler';

describe('services/genericErrorHandler', () => {

    let consoleErrorStub;

    beforeEach(() => {
        consoleErrorStub = sinon.stub(console, 'error'); //Supress
    });

    afterEach(() => {
        console.error.restore();
    });

    it('should get error message from response', () => {
        const expected = {
            code: '01',
            message: 'this'
        }
        const apiResponse = {
            response: {
                data: expected
            }
        }

        expect(handleError(apiResponse)).to.be.deep.equal(expected);
    });

    it('should handle default errors', () => {
        const expected = {
            detail: 'default error'
        };
        const err = {
            message: 'default error'
        };

        expect(handleError(err)).to.be.deep.equal(expected);

    });
});