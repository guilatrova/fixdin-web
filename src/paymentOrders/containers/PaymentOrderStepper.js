import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class PaymentOrderStepper extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired
    };

    state = {
        activeStep: 0,
    };
    
    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };
    
    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    renderStep = () => {
        switch(this.state.activeStep) {

            case 0:
                return <Step1 />

            case 1:
                return <Step2 />
            
            case 2:
                return <Step3 />

            default:
                console.error("step: " + this.state.activeStep);
                return <h1>INVALID STEP</h1>
        }
    }
    
    render() {
        const { classes, theme } = this.props;
        
        return (
            <div className={classes.root}>

                {this.renderStep()}

                <MobileStepper
                    type="dots"
                    steps={3}
                    position="static"
                    activeStep={this.state.activeStep}                    
                    nextButton={
                        <Button dense onClick={this.handleNext} disabled={this.state.activeStep === 5}>
                            Próximo
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Anterior
                        </Button>
                    }
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaymentOrderStepper);