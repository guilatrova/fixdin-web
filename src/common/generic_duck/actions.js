const request = (type, additional) => {
    return {
        type,
        ...additional
    }
};

const receive = (type, result, data) => {
    if (result === 'success') {
        return {
            type,
            result,
            ...data
        };
    }

    return {
        type,
        result,
        ...data
    }
};