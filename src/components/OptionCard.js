import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import makeStyles from "@mui/styles/makeStyles";
import useGameHook from "../hooks/useGameHook";
import { useDispatch, useSelector } from "react-redux";
import { getNumbersInFormatOnlyMillions } from "../actions/helperFn";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { updateSelectedAnswerRedux } from "../reducers/UiReducers";
import { useServerAuth } from "../hooks/useServerAuth";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    lineHeight: "120%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));

const OptionCard = ({
  img,
  title,
  description,
  tick,
  isSelected,
  correctOption,
  selectedOption,
  inputOption,
  disable,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { pointsOnCorrectAnswer, pointsOnWrongAnswer } = useGameHook();
  const { viberate } = useTelegramSDK();
  const { accountSC } = useServerAuth();

  const ansSelected = useSelector((state) => state.ui.ansSelected);

  const handleSelect = async () => {
    if (disable) {
      return;
    }
    viberate("medium");
    let dataObj = {
      userId: accountSC,
      ansArr: ansSelected,
      inputOption: inputOption,
    };
    dispatch(updateSelectedAnswerRedux(dataObj));
  };

  const backgroundCardBorder = useMemo(() => {
    if (
      isSelected &&
      correctOption === selectedOption &&
      correctOption === inputOption
    ) {
      return `linear-gradient(180deg, #4886FF 0%, green 100%)`;
    } else if (
      isSelected &&
      correctOption !== selectedOption &&
      inputOption != correctOption
    ) {
      return `linear-gradient(180deg, #4886FF 0%, red 100%)`;
    } else {
      return "transparent";
    }
  }, [isSelected, correctOption, selectedOption, inputOption]);

  const iconCondition = useMemo(() => {
    if (
      isSelected &&
      correctOption === selectedOption &&
      correctOption === inputOption
    ) {
      return "RIGHT";
    } else if (
      isSelected &&
      correctOption !== selectedOption &&
      inputOption != correctOption
    ) {
      return "WRONG";
    } else {
      return "OTHER";
    }
  }, [isSelected, correctOption, selectedOption, inputOption]);

  return (
    <>
      <Box
        onClick={handleSelect}
        sx={{
          width: "100%",
          maxWidth: 130,
          minWidth: 100,
          height: 160,
          borderRadius: "22px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2px",
          inset: "0",
          background: backgroundCardBorder,
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            background: "#161811",
            borderRadius: "22px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px 5px",
              gap: "5px",
              background:
                "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
            }}
          >
            <img
              src="star.png"
              alt="TaskDao"
              width={20}
              height={20}
              style={{
                position: "absolute",
                right: "10%",
                top: "8%",
                zIndex: 1,
              }}
            />
            <img
              src="star.png"
              alt="TaskDao"
              width={16}
              height={16}
              style={{
                position: "absolute",
                left: "10%",
                top: "25%",
                bottom: "",
                zIndex: 1,
              }}
            />
            <img src={img} alt="TaskDao" width={50} height={50} style={{}} />
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    width: "90%",
                    fontFamily: "'Rubik'",
                    fontWeight: 700,
                    fontSize: 15,
                    lineHeight: "110%",
                    textAlign: "center",
                    color: "#FAFF00",
                    minHeight: 35,
                  }}
                >
                  {title}
                </Typography>
              </Box>

              {(iconCondition === "RIGHT" || iconCondition === "WRONG") && (
                <Typography
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                    fontWeight: 400,
                    fontSize: 10,
                  }}
                >
                  <img
                    src={
                      "https://cdn3d.iconscout.com/3d/premium/thumb/dollar-coin-2997232-2516270.png?f=webp"
                    }
                    height={16}
                    width={16}
                  />
                  +
                  {iconCondition === "RIGHT"
                    ? getNumbersInFormatOnlyMillions(pointsOnCorrectAnswer)
                    : getNumbersInFormatOnlyMillions(pointsOnWrongAnswer)}
                </Typography>
              )}

              {iconCondition === "RIGHT" && (
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/successfully-done-5108472-4288033.png"
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                  }}
                />
              )}

              {iconCondition === "WRONG" && (
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/wrong-9090242-7480311.png?f=webp"
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OptionCard;
