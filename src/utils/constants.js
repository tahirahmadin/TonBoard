// 0 mainnet, 1 testnet
let network_type = 1;

let constants;
constants = {
  api_url:
    network_type === 1
      ? "https://testapi.gobbl.io/api"
      : "https://v2.onerare.io/api",
};

export const AUTH_TYPE_ENUM = {
  TELEGRAM: "TELEGRAM",
  GMAIL: "GMAIL",
  FACEBOOK: "FACEBOOK",
  TWITTER: "TWITTER",
  METAMASK: "METAMASK",
};

// League levels
export const LEAGUE_LEVEL_DATA = [
  {
    title: "Intern",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 0,
    coinsReward: 0,
  },
  {
    title: "Assistant",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 5000,
    coinsReward: 5000,
  },
  {
    title: "Manager",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 50000,
    coinsReward: 10000,
  },
  {
    title: "Senior Manager",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 250000,
    coinsReward: 30000,
  },
  {
    title: "Management Lead",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 500000,
    coinsReward: 50000,
  },
  {
    title: "Regional Manager",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 1000000,
    coinsReward: 100000,
  },
  {
    title: "CEO",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png",
    tapsRequired: 2500000,
    coinsReward: 250000,
  },
];

// Tap data
export const TAP_DATA = [
  {
    level: 0,
    dish: "/images/dishes/dish0.png",
    coins: 0,
    tapCount: 1,
  },
  {
    level: 1,
    dish: "/images/dishes/dish1.png",
    coins: 200,
    tapCount: 2,
  },
  {
    level: 2,
    dish: "/images/dishes/dish2.png",
    coins: 500,
    tapCount: 3,
  },
  {
    level: 3,
    dish: "/images/dishes/dish3.png",
    coins: 1000,
    tapCount: 4,
  },
  {
    level: 4,
    dish: "/images/dishes/dish4.png",
    coins: 2000,
    tapCount: 5,
  },
  {
    level: 5,
    dish: "/images/dishes/dish5.png",
    coins: 4000,
    tapCount: 6,
  },
  {
    level: 6,
    dish: "/images/dishes/dish6.png",
    coins: 8000,
    tapCount: 7,
  },
  {
    level: 7,
    dish: "/images/dishes/dish7.png",
    coins: 16000,
    tapCount: 8,
  },
  {
    level: 8,
    dish: "/images/dishes/dish8.png",
    coins: 25000,
    tapCount: 9,
  },
  {
    level: 9,
    dish: "/images/dishes/dish9.png",
    coins: 50000,
    tapCount: 10,
  },
  {
    level: 10,
    dish: "/images/dishes/dish10.png",
    coins: 100000,
    tapCount: 11,
  },
  {
    level: 11,
    dish: "/images/dishes/dish11.png",
    coins: 200000,
    tapCount: 12,
  },
  {
    level: 12,
    dish: "/images/dishes/dish12.png",
    coins: 300000,
    tapCount: 13,
  },
  {
    level: 13,
    dish: "/images/dishes/dish13.png",
    coins: 400000,
    tapCount: 14,
  },
  {
    level: 14,
    dish: "/images/dishes/dish14.png",
    coins: 500000,
    tapCount: 15,
  },
  {
    level: 15,
    dish: "/images/dishes/dish15.png",
    coins: 600000,
    tapCount: 16,
  },
  {
    level: 16,
    dish: "/images/dishes/dish16.png",
    coins: 7000000,
    tapCount: 17,
  },
  {
    level: 17,
    dish: "/images/dishes/dish17.png",
    coins: 8000000,
    tapCount: 18,
  },
  {
    level: 18,
    dish: "/images/dishes/dish18.png",
    coins: 9000000,
    tapCount: 19,
  },
  {
    level: 19,
    dish: "/images/dishes/dish19.png",
    coins: 10000000,
    tapCount: 20,
  },
];

// Energy Limit
export const ENERGY_LIMIT_DATA = [
  { level: 0, coins: 0, energyLimit: 2000 },
  { level: 1, coins: 200, energyLimit: 2500 },
  { level: 2, coins: 500, energyLimit: 3000 },
  { level: 3, coins: 1000, energyLimit: 3500 },
  { level: 4, coins: 2000, energyLimit: 4000 },
  { level: 5, coins: 4000, energyLimit: 4500 },
  { level: 6, coins: 8000, energyLimit: 5000 },
  { level: 7, coins: 16000, energyLimit: 5500 },
  { level: 8, coins: 25000, energyLimit: 6000 },
  { level: 9, coins: 50000, energyLimit: 6500 },
  { level: 10, coins: 100000, energyLimit: 7000 },
  { level: 11, coins: 200000, energyLimit: 7500 },
  { level: 12, coins: 300000, energyLimit: 8000 },
  { level: 13, coins: 400000, energyLimit: 8500 },
  { level: 14, coins: 500000, energyLimit: 9000 },
  { level: 15, coins: 600000, energyLimit: 9500 },
  { level: 16, coins: 700000, energyLimit: 10000 },
  { level: 17, coins: 800000, energyLimit: 10500 },
  { level: 18, coins: 900000, energyLimit: 11000 },
  { level: 19, coins: 1000000, energyLimit: 11500 },
];

// Recharge speed
export const RECHARGE_SPEED_DATA = [
  { level: 0, coins: 0, speed: 1 },
  { level: 1, coins: 2000, speed: 2 },
  { level: 2, coins: 10000, speed: 3 },
  { level: 3, coins: 100000, speed: 4 },
  { level: 4, coins: 250000, speed: 5 },
  { level: 5, coins: 500000, speed: 6 },
  { level: 6, coins: 1000000, speed: 7 },
  { level: 7, coins: 2000000, speed: 8 },
  { level: 8, coins: 4000000, speed: 9 },
  { level: 9, coins: 8000000, speed: 10 },
  { level: 10, coins: 25000000, speed: 11 },
];

// League levels
export const REFERRAL_COUNT_DATA = [1, 3, 10, 25, 50, 100];

export default constants;
