import React from "react";

import { DatePicker } from 'material-ui-pickers';

const defaultFormat = "DD/MM/YYYY";

const DatePickerProps = (props) => {
    let mask = undefined;

    if (props.format === defaultFormat) {
        mask = value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []);
    }

    return (
        <DatePicker
            keyboard
            fullWidth
            autoOk
            mask={mask}
            format={defaultFormat}
            {...props}
        />
    );
};

DatePickerProps.propTypes = DatePicker.propTypes;

DatePickerProps.defaultProps = {
    format: defaultFormat
};

export default DatePickerProps;
