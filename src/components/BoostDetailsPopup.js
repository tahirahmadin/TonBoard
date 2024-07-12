import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  useMediaQuery,
  Typography,
  useTheme,
  Button,
  Slide,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BoostDetailsPopup = ({
  title,
  img,
  description1,
  description2,
  price,
  level,
  openPopup,
  closePopup,
  onClick,
}) => {
  const score = useSelector((state) => state.ui.score);

  return (
    <Dialog
      open={openPopup}
      onClose={closePopup}
      TransitionComponent={Transition}
      aria-labelledby="simple-dialog-title"
      maxWidth="lg"
      fullWidth={false}
    >
      <Box
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
          onClick={closePopup}
        />
        <Box
          style={{
            width: "100%",
            height: 380,
            minHeight: "calc(100vh - 480px)",
            background: "linear-gradient(180deg, #4886FF 0%, #03429F 100%)",
            borderRadius: "32px 32px 0px 0px",
            padding: "1px 1px 0",
            marginTop: "-3px",
            zIndex: 1,
            position: "absolute",
            bottom: 60,
          }}
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              background: "#2B2D25",
              borderRadius: "32px 32px 0px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "35px 5% 25px",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <Button
              onClick={closePopup}
              style={{
                position: "absolute",
                top: 13,
                right: 11,
                minWidth: "auto",
                width: 36,
                height: 36,
                borderRadius: "50%",
              }}
            >
              <Close
                style={{
                  fontSize: 36,
                  fill: "#faff00",
                  zIndex: 1,
                }}
              />
            </Button>
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Typography
                style={{
                  fontWeight: 800,
                  fontSize: 24,
                  lineHeight: "28px",
                  textAlign: "center",
                  color: "#64FF99",
                }}
              >
                {title}
              </Typography>
              <Box
                style={{
                  width: 80,
                  height: 80,
                  background:
                    "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
                  borderRadius: "12px",
                  padding: "1px",
                  transition: "height 200ms",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#2B2D25",
                    borderRadius: "12px",
                  }}
                >
                  <img
                    src={img}
                    style={{
                      width: 80,
                      height: 80,
                      padding: "5px 5px 0",
                      objectFit: "contain",
                      background:
                        "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
                    }}
                  />
                </Box>
              </Box>
              <Typography
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "115%",
                  textAlign: "center",
                  color: "#FFFFFF",
                  opacity: 0.8,
                  maxWidth: "70%",
                  margin: "0 auto",
                }}
              >
                {description1}
                <br />
                {description2}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  margin: "10px 0",
                }}
              >
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",

                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "16px",
                    color: "#FFFFFF",
                  }}
                >
                  <img
                    src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-dollar-coin-icon-3d-png-image_7966148.png"
                    style={{ width: 24, height: 24 }}
                  />
                  {price > 0 ? price : "FREE"}
                </Typography>
                {level && (
                  <Box
                    style={{
                      width: "0px",
                      height: "23px",
                      opacity: 0.2,
                      border: "0.5px solid #FFFFFF",
                    }}
                  />
                )}
                {level && (
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "16px",
                      color: "#FFFFFF",
                    }}
                  >
                    {level} LEVEL
                  </Typography>
                )}
              </Box>
              <Button
                onClick={onClick}
                disabled={price ? score < price : false}
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#000000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 250,
                  margin: "0 auto",
                  height: "51px",
                  background: "#64FF99",
                  borderRadius: "12px",
                }}
              >
                {price
                  ? score > price
                    ? "PURCHASE"
                    : "INSUFFICIENT"
                  : "CLAIM"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default BoostDetailsPopup;
