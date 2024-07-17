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
  METAMASK: "METAMASK",
};

// League levels
export const LEAGUE_LEVEL_DATA = [
  {
    id: 0,
    title: "Intern",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/black-businessman-is-in-the-office-11529622-9404879.png?f=webp",
    tapsRequired: 0,
    coinsReward: 0,
  },
  {
    id: 1,
    title: "Worker",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-card-showing-thumbs-up-5669920-4849245.png?f=webp",
    tapsRequired: 5000,
    coinsReward: 5000,
  },
  {
    id: 2,
    title: "Manager",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-learning-on-bank-card-5669906-4849231.png?f=webp",
    tapsRequired: 50000,
    coinsReward: 10000,
  },
  {
    id: 3,
    title: "Senior Manager",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-card-showing-thumbs-up-5669920-4849245.png?f=webp",
    tapsRequired: 250000,
    coinsReward: 30000,
  },
  {
    id: 4,
    title: "Executive Manager",
    img: "/images/level/level3.png",
    tapsRequired: 500000,
    coinsReward: 50000,
  },
  {
    id: 5,
    title: "Pastry Chef",
    img: "/images/level/level4.png",
    tapsRequired: 1000000,
    coinsReward: 100000,
  },
  {
    id: 6,
    title: "Sous Chef",
    img: "/images/level/level5.png",
    tapsRequired: 2500000,
    coinsReward: 250000,
  },
  {
    id: 7,
    title: "Head Chef",
    img: "/images/level/level6.png",
    tapsRequired: 5000000,
    coinsReward: 500000,
  },
  {
    id: 8,
    title: "Executive Chef",
    img: "/images/level/level7.png",
    tapsRequired: 10000000,
    coinsReward: 1000000,
  },
  {
    id: 9,
    title: "Master Chef",
    img: "/images/level/level8.png",
    tapsRequired: 50000000,
    coinsReward: 5000000,
  },
  {
    id: 10,
    title: "Master End",
    img: "/images/level/level8.png",
    tapsRequired: 9000000000000000,
    coinsReward: 0,
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
    coins: 700000,
    tapCount: 17,
  },
  {
    level: 17,
    dish: "/images/dishes/dish17.png",
    coins: 800000,
    tapCount: 18,
  },
  {
    level: 18,
    dish: "/images/dishes/dish18.png",
    coins: 900000,
    tapCount: 19,
  },
  {
    level: 19,
    dish: "/images/dishes/dish19.png",
    coins: 1000000,
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

// Special Tasks Data
export const SPECIAL_TASKS_DATA = [
  {
    id: 0,
    title: "Follow TaskDao on X",
    pointsText: "25K",
    points: 25000,
    taskNumber: 101,
    type: "SPECIAL",
    url: "https://x.com/intent/follow?screen_name=gmgobbl",
  },
  {
    id: 1,
    title: "Like this Tweet",
    pointsText: "25K",
    points: 25000,
    taskNumber: 102,
    type: "SPECIAL",
    url: "https://x.com/intent/like?tweet_id=1805921302760260012",
  },
  {
    id: 2,
    title: "Retweet this Tweet",
    pointsText: "50K",
    points: 50000,
    taskNumber: 103,
    type: "SPECIAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
];

// League Tasks Data
export const LEAGUE_TASKS_DATA = [
  {
    id: 0,
    title: "Intern",
    pointsText: "5K",
    points: 5000,
    taskNumber: 201,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 1,
    title: "Worker",
    pointsText: "50K",
    points: 50000,
    taskNumber: 202,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 2,
    title: "Manager",
    pointsText: "250K",
    points: 250000,
    taskNumber: 203,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 3,
    title: "Senior Manager",
    pointsText: "500K",
    points: 500000,
    taskNumber: 204,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 4,
    title: "Pastry Chef",
    pointsText: "1M",
    points: 1000000,
    taskNumber: 205,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 5,
    title: "Sous Chef",
    pointsText: "2.5M",
    points: 2500000,
    taskNumber: 206,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 6,
    title: "Head Chef",
    pointsText: "5M",
    points: 5000000,
    taskNumber: 207,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 7,
    title: "Executive Chef",
    pointsText: "10M",
    points: 10000000,
    taskNumber: 208,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 8,
    title: "Master Chef",
    pointsText: "50M",
    points: 50000000,
    taskNumber: 209,
    type: "LEAGUE",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
];
export const REFERRAL_TASKS_DATA = [
  {
    id: 0,
    title: "Invite 1 friend",
    referralRequired: 1,
    points: 2500,
    pointsText: "2.5K",
    taskNumber: 301,
    type: "REFERRAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 1,
    title: "Invite 3 friends",
    referralRequired: 3,
    pointsText: "50K",
    points: 50000,
    taskNumber: 302,
    type: "REFERRAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 2,
    title: "Invite 10 friends",
    referralRequired: 10,
    pointsText: "200K",
    points: 200000,
    taskNumber: 303,
    type: "REFERRAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 3,
    title: "Invite 25 friends",
    referralRequired: 25,
    pointsText: "250K",
    points: 250000,
    taskNumber: 304,
    type: "REFERRAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 4,
    title: "Invite 50 friends",
    referralRequired: 50,
    pointsText: "300K",
    points: 300000,
    taskNumber: 305,
    type: "REFERRAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
  {
    id: 5,
    title: "Invite 100 friends",
    referralRequired: 100,
    pointsText: "500K",
    points: 500000,
    taskNumber: 306,
    type: "REFERRAL",
    url: "https://x.com/intent/retweet?tweet_id=1805921302760260012",
  },
];

export const QUIZ_DATA = [
  {
    id: 0,
    title: "Who invented the Bitcoin?",
    option1: "Satoshi Nakamoto",
    option2: "Vitalink Buterin",
    correct: 1,
  },
  {
    id: 1,
    title: "What is most suitable category io.net token?",
    option1: "GPU/DePin",
    option2: "Oracle",
    correct: 1,
  },
];

export default constants;
