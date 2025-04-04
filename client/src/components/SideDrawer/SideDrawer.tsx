// SideDrawer.tsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

interface SideDrawerProps {
  listItems: Array<{
    icon: React.ReactNode;
    text: string;
    key: string;
  }>;
  selectedItem: string | null;
  handleListItemClick: (key: string) => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  listItems,
  selectedItem,
  handleListItemClick,
}) => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      style={{ width: "250px", flexShrink: 0 }}
      PaperProps={{
        style: {
          width: "250px",
          position: "relative",
        },
      }}
    >
      <List sx={{paddingTop: "0px"}}>
        {listItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedItem === item.key}
            onClick={() => handleListItemClick(item.key)}
            sx={{ color: "text.primary" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
