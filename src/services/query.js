import { clean } from '../utils/formatters';

export default function getQueryParams(filters) {
    let queryParams = '';
    let loopCount = 0;
    filters = clean(filters);
    
    for (let key in filters) {
        queryParams += (loopCount > 0) ? '&' : '?';
        queryParams += `${key}=${filters[key]}`;
        loopCount++;
    }

    return queryParams;
}