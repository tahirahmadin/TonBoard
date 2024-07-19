import React, { useEffect, useMemo, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import BoostDetailsPopup from "../components/BoostDetailsPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  ENERGY_LIMIT_DATA,
  RECHARGE_SPEED_DATA,
  TAP_DATA,
} from "../utils/constants";
import useGameHook from "../hooks/useGameHook";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SmallProgressBar from "../components/SmallProgressBar";

const BoosterCard = ({
  title,
  img,
  price,
  level,
  type,
  description1,
  description2,
  isFull,
}) => {
  const { viberate } = useTelegramSDK();
  const score = useSelector((state) => state.ui.score);
  const { upgradeBoosterLevel } = useGameHook();

  const [open, setOpen] = useState(false);

  const handlePurchaseButton = async () => {
    await upgradeBoosterLevel(type, price);
    setOpen(false);
  };

  return (
    <Box
      style={{
        width: "100%",
        height: 60,
        minHeight: 60,
        background:
          "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
        borderRadius: "8px",
        padding: "1px",
        transition: "height 250ms",
      }}
      onClick={() => {
        if (!open && !isFull) {
          viberate("light");
          setOpen(true);
        }
      }}
    >
      <BoostDetailsPopup
        title={title}
        description1={description1}
        description2={description2}
        img={img}
        price={price}
        level={level + 1}
        openPopup={open}
        closePopup={() => {
          viberate("light");
          setOpen(false);
        }}
        onClick={handlePurchaseButton}
      />
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#2B2D25",
          borderRadius: "8px",
        }}
      >
        <Box
          style={{
            width: "100%",
            minHeight: "100%",
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "15px",
            padding: "0 15px",
            position: "relative",
          }}
        >
          <Box
            style={{
              width: 41,
              height: 41,
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
                borderRadius: "12px",
              }}
            >
              <img
                src={img}
                style={{
                  width: 41,
                  height: 42,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
          <Box
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "120%",
                color: "#FFFFFF",
              }}
            >
              {title}
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "'Karla'",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#FFFFFF",
                }}
              >
                {isFull && "FULLY UPGRADED"}
                {!isFull && (
                  <span>
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/usd-coin-5839397-4884145.png?f=webp"
                      style={{ width: 24, height: 24 }}
                    />
                    {price}
                  </span>
                )}
              </Typography>
              <Box
                style={{
                  width: "0px",
                  height: "23px",
                  opacity: 0.2,
                  border: "0.5px solid #FFFFFF",
                }}
              />
              <Typography
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#FFFFFF",
                }}
              >
                {level} LEVEL
              </Typography>
            </Box>
          </Box>
          <ArrowForwardIos
            style={{
              fill: "#ffffff",
              position: "absolute",
              margin: "auto 0",
              right: 10,
            }}
            onClick={isFull ? null : () => setOpen(true)}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Boost = () => {
  const { viberate } = useTelegramSDK();
  const navigate = useNavigate();
  const { enableMultiTap, claimFullEnergy, gameScore } = useGameHook();
  const score = useSelector((state) => state.ui.score);
  const multiTapStamp = useSelector((state) => state.ui.multiTapStamp);
  const multiTapFlag = useSelector((state) => state.ui.multiTapFlag);
  const fullHungerStamp = useSelector((state) => state.ui.fullHungerStamp);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const [multiTapPopup, setMultiTapPopup] = useState(false);
  const [fullHungerPopup, setFullHungerPopup] = useState(false);

  const handleMultiTapFn = async () => {
    enableMultiTap();
    setMultiTapPopup(false);
    navigate("/");
  };

  const handleFullHungerFn = async () => {
    claimFullEnergy();
    setFullHungerPopup(false);
    navigate("/");
  };

  const multiTapCloseCondition = useMemo(() => {
    if (multiTapFlag || multiTapStamp.length === 3) {
      return true;
    } else {
      return false;
    }
  }, [multiTapFlag, multiTapStamp]);

  const fullHungerCloseCondition = useMemo(() => {
    if (fullHungerStamp.length === 3) {
      return true;
    } else {
      return false;
    }
  }, [fullHungerStamp]);

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Profile />

      <Box
        mt={2}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/022/442/216/small_2x/icon-money-3d-illustration-png.png"
          }
          height={"10%"}
          width={"40%"}
        />
        <Typography
          style={{
            width: "100%",
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          Boosters
        </Typography>
      </Box>

      {/* Cards */}
      <Box
        mt={8}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            width: "90%",
            height: "100%",
            zIndex: 0,
            position: "relative",
          }}
        >
          <Box>
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <BoosterCard
                title="Upgrade Timer"
                img="https://cdn3d.iconscout.com/3d/premium/thumb/fasting-8156958-6516912.png?f=webp"
                price={
                  TAP_DATA[playLevels.tap + 1]
                    ? TAP_DATA[playLevels.tap + 1].coins
                    : 0
                }
                level={playLevels.tap + 1}
                type={"TAP"}
                description1="Upgrade timer to increase your quiz frequency."
                description2="+10 mins each level."
                isFull={TAP_DATA[playLevels.tap + 1] ? false : true}
              />
              <BoosterCard
                title="Upgrade Reward"
                img="https://cdn3d.iconscout.com/3d/premium/thumb/financial-growth-11104869-8938742.png"
                price={
                  ENERGY_LIMIT_DATA[playLevels.energy + 1]
                    ? ENERGY_LIMIT_DATA[playLevels.energy + 1].coins
                    : 0
                }
                level={playLevels.energy + 1}
                type={"ENERGY"}
                description1="Increase the rewards per correct question."
                description2="+100,000 Reward Increase for each level."
                isFull={ENERGY_LIMIT_DATA[playLevels.energy + 1] ? false : true}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Boost;
