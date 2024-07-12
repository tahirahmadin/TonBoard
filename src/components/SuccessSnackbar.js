import { Alert, Slide, Snackbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuccessPopup } from "../reducers/UiReducers";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const SuccessSnackbar = ({ text, style }) => {
  const dispatch = useDispatch();
  const successPopup = useSelector((state) => state.ui.successPopup);
  return (
    <Snackbar
      open={successPopup}
      onClose={() => dispatch(setSuccessPopup(false))}
      TransitionComponent={SlideTransition}
      autoHideDuration={1200}
      style={{
        position: "absolute",
        zIndex: 1111,
        ...style,
      }}
    >
      <Alert
        icon={false}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "94%",
          height: "48px",
          background: "linear-gradient(180deg, #28B3A2 0%, #0BB0A3 100%)",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.45)",
          borderRadius: "16px",
          marginLeft: "3%",
          marginBottom: "5%",
        }}
      >
        <Typography
          style={{
            fontWeight: 700,
            fontSize: "14px",
            color: "#000000",
          }}
        >
          {text}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
