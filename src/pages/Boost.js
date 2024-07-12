import React, { useMemo, useState } from "react";
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

const BoosterCard = ({
  title,
  img,
  price,
  level,
  type,
  description1,
  description2,
}) => {
  const { viberate } = useTelegramSDK();
  const score = useSelector((state) => state.ui.score);
  const { upgradeBoosterLevel } = useGameHook();

  const [open, setOpen] = useState(false);

  const handlePurchaseButton = async () => {
    // if (score > price) {
    await upgradeBoosterLevel(type, price);
    setOpen(false);
    // }
  };

  return (
    <Box
      style={{
        width: "100%",
        height: 55,
        minHeight: 55,
        background:
          "linear-gradient(254.51deg, #00CCCC 5.63%, #009999 61.19%, #6666FF 116.96%)",
        borderRadius: "8px",
        padding: "1px",
        transition: "height 250ms",
      }}
      onClick={() => {
        if (!open) {
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
        level={level}
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

                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#FFFFFF",
                }}
              >
                <img
                  src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-dollar-coin-icon-3d-png-image_7966148.png"
                  style={{ width: 24, height: 24 }}
                />
                {price}
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
              fill: "#faff00",
              position: "absolute",
              margin: "auto 0",
              right: 10,
            }}
            onClick={() => setOpen(true)}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Boost = () => {
  const { viberate } = useTelegramSDK();
  const { enableMultiTap, claimFullEnergy } = useGameHook();
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
  };

  const handleFullHungerFn = async () => {
    claimFullEnergy();
    setFullHungerPopup(false);
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
        minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        paddingTop: "25px",
        zIndex: 0,
      }}
    >
      <BoostDetailsPopup
        title="MULTI TAP"
        description1="Multiply your tap income by x5 for 20 seconds."
        description2="Do not use energy while active."
        img="/images/upgrade.png"
        price={0}
        openPopup={multiTapPopup}
        closePopup={() => {
          viberate("light");
          setMultiTapPopup(false);
        }}
        onClick={handleMultiTapFn}
      />
      <BoostDetailsPopup
        title="FULL HUNGER"
        description1="Fill your energy to the max."
        description2={<br />}
        img="/images/hunger.png"
        price={0}
        openPopup={fullHungerPopup}
        closePopup={() => {
          viberate("light");
          setFullHungerPopup(false);
        }}
        onClick={handleFullHungerFn}
      />
      <SuccessSnackbar text="Booster claimed successfully!" />
      <img
        src="/images/bg_grid.png"
        alt="TaskDao"
        className="portrait"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          objectFit: "cover",
        }}
      />

      <Box
        style={{
          width: "90%",
          height: "87px",
          background: "linear-gradient(180deg, #FF97FF 0%, #CC37CC 100%)",
          borderRadius: "24px",
          padding: "1px",
          marginTop: "15px",
          marginLeft: "5%",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            background: "#2B2D25",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Typography
            style={{ fontWeight: 400, fontSize: "16px", lineHeight: "19px" }}
          >
            Your Share Balance
          </Typography>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "100%",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <img
              src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-dollar-coin-icon-3d-png-image_7966148.png"
              style={{
                width: 35,
                height: 35,
              }}
            />
            {score.toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          width: "100%",
          height: 121,
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "-25px",
          paddingLeft: "5%",
        }}
      >
        <img
          src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-dollar-coin-icon-3d-png-image_7966148.png"
          style={{
            width: 155,
            height: 125,
            objectFit: "contain",
            zIndex: 0,
            marginRight: "auto",
          }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #4886FF 0%, #03429F 100%)",
          borderRadius: "32px 32px 0px 0px",
          padding: "1px 1px 0",
          marginTop: "-3px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "calc(100vh - 281px)",
            minHeight: "calc(100vh - 281px)",
            background: "#2B2D25",
            borderRadius: "32px 32px 0px 0px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "25px 5%",
          }}
        >
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "150%",
              color: "#FAFF00",
            }}
          >
            Your Daily Boosters
          </Typography>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "25px",
            }}
          >
            <Button
              style={{
                width: "50%",
                height: 55,
                background: "linear-gradient(180deg, #7848FF 0%, #346DFF 100%)",
                borderRadius: "8px",
                padding: "1px",
              }}
              onClick={() =>
                !multiTapCloseCondition ? setMultiTapPopup(true) : null
              }
            >
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: !multiTapPopup && "#2B2D25",
                  borderRadius: "8px",
                  padding: "0 10px",
                }}
              >
                <img
                  src="/images/upgrade.png"
                  style={{ width: 41, height: 42 }}
                />
                <Box
                  style={{
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "100%",
                    color: "#FAFF00",

                    textAlign: "left",
                  }}
                >
                  MULTI TAP
                  <br />
                  <Typography
                    style={{
                      fontWeight: 800,
                      fontSize: "24px",
                      lineHeight: "28px",
                      color: multiTapCloseCondition ? "#bdbdbd" : "#64FF99",
                    }}
                  >
                    {3 - multiTapStamp.length}/3
                  </Typography>
                </Box>
              </Box>
            </Button>
            <Button
              style={{
                width: "50%",
                height: 55,
                background: "linear-gradient(180deg, #7848FF 0%, #346DFF 100%)",
                borderRadius: "8px",
                padding: "1px",
              }}
              onClick={() =>
                !fullHungerCloseCondition ? setFullHungerPopup(true) : null
              }
            >
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: !fullHungerPopup && "#2B2D25",
                  borderRadius: "8px",
                  padding: "0 10px",
                }}
              >
                <img
                  src="/images/hunger.png"
                  style={{ width: 41, height: 42 }}
                />
                <Box
                  style={{
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "100%",
                    color: "#FAFF00",

                    textAlign: "left",
                  }}
                >
                  Full Hunger
                  <br />
                  <Typography
                    style={{
                      fontWeight: 800,
                      fontSize: "24px",
                      lineHeight: "28px",
                      color: fullHungerCloseCondition ? "#bdbdbd" : "#64FF99",
                    }}
                  >
                    {3 - fullHungerStamp.length}/3
                  </Typography>
                </Box>
              </Box>
            </Button>
          </Box>
          <Box
            style={{
              width: "66%",
              height: "0px",
              opacity: 0.2,
              border: "1px solid #FFFFFF",
              margin: "5% auto",
            }}
          />
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "120%",
              color: "#FAFF00",
            }}
          >
            Boosters
          </Typography>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <BoosterCard
              title="UPGRADE LEVEL"
              img="/images/booster/upgrade_level.png"
              price={TAP_DATA[playLevels.tap + 1].coins}
              level={playLevels.tap + 1}
              type={"TAP"}
              description1="Unlock new dishes & increase your earnings per feed."
              description2="+1 per feed for each level."
            />
            <BoosterCard
              title="EXPAND TUMMY"
              img="/images/booster/expand_tummy.png"
              price={ENERGY_LIMIT_DATA[playLevels.energy + 1].coins}
              level={playLevels.energy + 1}
              type={"ENERGY"}
              description1="Size up TASK stomach so he can eat more at one time."
              description2="+500 Tummy Expand for each level."
            />
            <BoosterCard
              title="HUNGER PANGS"
              img="/images/booster/hunger_pangs.png"
              price={RECHARGE_SPEED_DATA[playLevels.recharge + 1].coins}
              level={playLevels.recharge + 1}
              type={"RECHARGE"}
              description1="Get TASK hungry faster! More Hunger Pangs mean TaskDao feeds more."
              description2="+1 per second."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Boost;
