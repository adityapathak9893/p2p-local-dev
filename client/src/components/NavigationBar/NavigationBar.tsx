import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.scss";
import { useActionDispatch } from "../../hooks";

const settings = ["Logout"];

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

  return (
    <AppBar position="static">
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
                p2p_local
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
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={props.loggedInUserName ?? ""}
                    src="/static/images/avatar/2.jpg"
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleLogout}>
                      {setting}
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
