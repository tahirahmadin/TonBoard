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

// Timer data
export const TIMER_BOOST_DATA = [
  {
    level: 0,
    coins: 0,
  },
  {
    level: 1,
    coins: 2000,
  },
  {
    level: 2,
    coins: 5000,
  },
  {
    level: 3,
    coins: 10000,
  },
  {
    level: 4,
    coins: 20000,
  },
  {
    level: 5,
    coins: 40000,
  },
  {
    level: 6,
    coins: 80000,
  },
  {
    level: 7,
    coins: 200000,
  },
  {
    level: 8,
    coins: 500000,
  },
  {
    level: 9,
    coins: 1000000,
  },
  {
    level: 10,
    coins: 2500000,
  },
  {
    level: 11,
    coins: 5000000,
  },
];

// Energy Limit
export const REWARDS_BOOST_DATA = [
  { level: 0, coins: 0 },
  { level: 1, coins: 200 },
  { level: 2, coins: 500 },
  { level: 3, coins: 1000 },
  { level: 4, coins: 2000 },
  { level: 5, coins: 4000 },
  { level: 6, coins: 8000 },
  { level: 7, coins: 16000 },
  { level: 8, coins: 25000 },
  { level: 9, coins: 50000 },
  { level: 10, coins: 100000 },
  { level: 11, coins: 200000 },
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
    correct: 2,
  },
];

export default constants;
