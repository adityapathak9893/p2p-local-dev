import React, { useState } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useActionDispatch } from "../../hooks";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface NotificationPopperProps {
  message: string;
  doesErrorOccur: boolean;
}

export const NotificationPopper: React.FC<NotificationPopperProps> = ({
  message,
  doesErrorOccur,
}) => {
  const [open, setOpen] = useState(true);
  const { resetBackendMessage, resetErrorState } = useActionDispatch();

  const handleClose: SnackbarProps["onClose"] = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    resetBackendMessage();
    resetErrorState();
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
      <div>
        <Alert
          onClose={(event) => handleClose(event, "timeout")}
          severity={doesErrorOccur ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {message}
          <Button
            color="inherit"
            size="small"
            onClick={(event) => handleClose(event, "timeout")}
          >
            OK
          </Button>
        </Alert>
      </div>
    </Snackbar>
  );
};
