import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

type ComponentProp = React.FC;

interface ITabComponent {
  tabDetails: {
    value: string;
    label: string;
  }[];
  tabValue: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

export const TabComponent: React.FC<ITabComponent> = ({
  tabDetails,
  handleTabChange,
  tabValue,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {tabDetails.map((tab, index) => (
          <Tab key={index} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};
