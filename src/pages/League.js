import React from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography } from "@mui/material";
import ProgressBar from "../components/ProgressBar";
import useGameHook from "../hooks/useGameHook";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { LEAGUE_LEVEL_DATA, LEAGUE_TASKS_DATA } from "../utils/constants";
import Slider from "react-slick";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { useSelector } from "react-redux";

function NextArrow(props) {
  const { viberate } = useTelegramSDK();
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={() => {
        if (onClick) {
          viberate("light");
          onClick();
        }
      }}
    >
      <Button
        style={{
          position: "absolute",
          top: 25,
          right: -10,
          minWidth: 30,
          maxWidth: 30,
          minHeight: 30,
          maxHeight: 30,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          zIndex: 5,
          opacity: !onClick && 0.5,
        }}
      >
        <ArrowForwardIos style={{ fill: "#FAFF00" }} />
      </Button>
    </div>
  );
}

function PrevArrow(props) {
  const { viberate } = useTelegramSDK();
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={() => {
        if (onClick) {
          viberate("light");
          onClick();
        }
      }}
    >
      <Button
        style={{
          position: "absolute",
          top: 25,
          left: -10,
          minWidth: 30,
          maxWidth: 30,
          minHeight: 30,
          maxHeight: 30,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(0px 8px 28px rgba(0, 0, 0, 0.25))",
          zIndex: 5,
          opacity: !onClick && 0.5,
        }}
      >
        <ArrowBackIos style={{ fill: "#FAFF00", marginLeft: "10px" }} />
      </Button>
    </div>
  );
}

const League = () => {
  const tapScore = useSelector((state) => state.ui.tapScore);

  const { gameLeagueLevel } = useGameHook();

  const settings = {
    initialSlide: gameLeagueLevel,
    fade: true,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      style={{
        width: "100%",
        minHeight: "calc(100vh - 60px)",
        height: "100%",
        position: "relative",
        background: "#161811",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Profile />
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
          height: "calc(100vh - 151px)",
          marginLeft: "5%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "5px",
          paddingBottom: 35,
        }}
      >
        <Box
          style={{
            width: "80%",
            minHeight: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            margin: "auto",
          }}
        >
          <Box style={{ width: "100%", position: "relative", zIndex: 1 }}>
            <Slider {...settings}>
              {LEAGUE_TASKS_DATA?.map((level, i) => (
                <Box
                  key={i}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: "32px",
                      lineHeight: "38px",
                      display: "flex",
                      alignItems: "center",
                      color: "#64FF99",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {level.title}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "19px",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      color: "#FFFFFF",
                      opacity: 0.8,
                    }}
                  >
                    Your number of shares determines
                    <br />
                    the league you enter.
                  </Typography>
                  <img
                    src={level.img}
                    alt="TaskDao"
                    style={{
                      minHeight: 300,
                      width: i == 2 || i == 3 || i == 5 ? "85%" : "100%",
                      objectFit: "contain",
                      margin: "auto",
                      marginTop: i == 4 ? "15px" : i == 5 ? "15px" : "5px",
                    }}
                  />

                  {tapScore > level.tapsRequired &&
                    tapScore < LEAGUE_LEVEL_DATA[i + 1].tapsRequired && (
                      <Box
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          marginTop: (i == 4 || i == 5) && "-10px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "3px",
                          }}
                        >
                          <img
                            src="/images/hunger.png"
                            style={{
                              width: 33,
                              height: 34,
                              objectFit: "contain",
                            }}
                          />

                          <Typography
                            style={{
                              width: "100%",

                              fontWeight: 500,
                              fontSize: "24px",
                              lineHeight: "28px",
                              color: "#D1FF1A",
                            }}
                          >
                            {tapScore.toLocaleString()}
                            <span style={{ fontSize: 17 }}>
                              /
                              {LEAGUE_LEVEL_DATA[
                                i + 1
                              ].tapsRequired.toLocaleString()}
                            </span>
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            width: "100%",
                          }}
                        >
                          <ProgressBar value={tapScore / level.tapsRequired} />
                        </Box>
                      </Box>
                    )}
                  {tapScore < level.tapsRequired && (
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: (i == 4 || i == 5) && "-10px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "3px",
                        }}
                      >
                        <Typography
                          style={{
                            width: "100%",

                            fontWeight: 500,
                            fontSize: "24px",
                            lineHeight: "28px",
                            color: "#D1FF1A",
                          }}
                        >
                          From {level.tapsRequired.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Slider>
          </Box>
          <img
            src="/images/league_bg.svg"
            style={{
              position: "absolute",
              top: "-8%",
              zIndex: -1,
              minWidth: "200%",
              marginLeft: "-12%",
            }}
            className="rotate_img"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default League;
