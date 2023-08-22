import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./StepperComponent.scss";

interface IStepperComponentProps {
  steps: {
    index: number;
    stepKey: string;
    label: string;
  }[];
  activeStep: number;
}

export const StepperComponent: React.FC<IStepperComponentProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.stepKey}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
