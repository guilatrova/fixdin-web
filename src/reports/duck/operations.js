import actions from './actions.js';
import createApi from './../../services/api';
import handleError from './../../services/genericErrorHandler';

const fetchLast13MonthsReport = () => (dispatch) => {
    dispatch(actions.requestLast13MonthsReport());

    const api = createApi();
    return api.get('reports/last-13-months')
        .then(response => response.data)
        .then(data => {
            dispatch(actions.receiveLast13MonthsReport('success', data));
            return data;
        })
        .catch(err => dispatch(actions.receiveLast13MonthsReport('fail', handleError(err))));
};

export default {
    fetchLast13MonthsReport
};