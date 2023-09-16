import Avatar from "@mui/material/Avatar";
import React from "react";
import { stringAvatar } from "../../helpers";

interface IBackGroundAvatar {
  userName: string;
  width: number;
  height: number;
}

export const BackGroundAvatar: React.FC<IBackGroundAvatar> = ({
  userName,
  width,
  height,
}) => {
  return <Avatar {...stringAvatar(userName, width, height)} />;
};
