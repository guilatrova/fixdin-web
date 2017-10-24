import handleError from './genericErrorHandler';

describe('services/genericErrorHandler', () => {

    let consoleErrorStub, replaceStub;

    beforeEach(() => {
        consoleErrorStub = sinon.stub(console, 'error'); //Supress
        replaceStub = sinon.stub(window.location, 'replace');
    });

    afterEach(() => {
        console.error.restore();
        window.location.replace.restore();
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

    it('should redirect when token expires', () => {
        const apiResponse = {
            response: {
                status: 401,
                data: { detail: 'Token has expired'}
            }
        };        

        handleError(apiResponse);
        
        expect(replaceStub.calledOnce).to.be.true;
        expect(replaceStub.calledWith('null/Login')).to.be.true;

    });
});