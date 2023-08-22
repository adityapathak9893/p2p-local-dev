import { Divider } from "@mui/material";
import React from "react";

interface IDotComponentProps {
  className: string;
}

export const DotComponent: React.FC<IDotComponentProps> = ({ className }) => {
  const getDivider = (): JSX.Element => <div className={className} />;
  return <Divider component={getDivider} />;
};
