const UNKNOWN_ERROR_NAME = 'detail';

export default function tryHandleAPIResponse(err) {
    if (err.response) {
        return err.response.data;
    }
    else {        
        console.error('Unhandled error: ' + err.message);
        console.error(err);
        return { [UNKNOWN_ERROR_NAME]: err.message };
    }
}