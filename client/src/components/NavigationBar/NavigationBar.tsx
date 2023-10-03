import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { BackGroundAvatar } from "../BackGroundAvatar";
import "./NavigationBar.scss";

interface INavigationBarProps {
  otherPages?: {
    label: string;
    link: string;
  }[];
  signInSignUpPages?: {
    label: string;
    link: string;
  }[];
  isUserLoggedIn?: boolean;
  loggedInUserName?: string;
}

export const NavigationBar: React.FC<INavigationBarProps> = (
  props: INavigationBarProps
) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { doUserSignOut } = useActionDispatch();
  const { userBalance } = useStateSelector();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Dispatch action to logout user
    doUserSignOut().then(() => {
      navigate("/");
    });
  };

  const handleMyProfile = () => {
    navigate("/MyProfile");
  };

  const settings = [
    {
      key: "logout",
      label: "Logout",
      handler: () => {
        handleLogout();
      },
    },
    {
      key: "myProfile",
      label: "My Profile",
      handler: () => {
        handleMyProfile();
      },
    },
  ];

  return (
    <AppBar position="relative" sx={{ background: "transparent" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <div className="brandLogoClass">
            <Link to="/">
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".4rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                LOCALBITTRADES
              </Typography>
            </Link>
          </div>
        </Box>
        <Box sx={{ display: "flex", flex: 4 }}>
          {props.otherPages?.map((page, key) => (
            <Link to={page.link} key={page.link}>
              <Button key={key} sx={{ ml: 1, color: "white" }}>
                {page.label}
              </Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          {!props.isUserLoggedIn ? (
            props.signInSignUpPages?.map((page, key) => (
              <Link to={page.link} key={page.link}>
                <Button key={key} sx={{ ml: 1, color: "white" }}>
                  {page.label}
                </Button>
              </Link>
            ))
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "200px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Current Wallet Balance:
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {`${userBalance} BTC`}
                  </Typography>
                </Box>
              </Box>
              <Tooltip title={props.loggedInUserName ?? ""}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <BackGroundAvatar
                    userName={props.loggedInUserName ?? ""}
                    width={50}
                    height={50}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.key} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={setting.handler}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
