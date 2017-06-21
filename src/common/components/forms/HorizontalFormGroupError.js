import React from 'react';

import {    
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Checkbox,
  Button,
  HelpBlock,
  PanelBody,
  ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

const HorizontalFormGroupError = ({id, label, error, children, onChange, maxLength, value}) => {
    return (
        <FormGroup controlId={id} validationState={error ? 'error' : undefined}>

            <Col componentClass={ControlLabel} sm={2}>
                {label}
            </Col>

            <Col sm={10}>
                {children || 
                    <FormControl
                        className='border-focus-blue'
                        name={id}
                        onChange={onChange}
                        value={value}
                        maxLength={maxLength ? maxLength : undefined} />
                }

                {error &&
                    <HelpBlock>{error}</HelpBlock>
                }
            </Col>

        </FormGroup>
    );
};

export default HorizontalFormGroupError