// 0 mainnet, 1 testnet
let network_type = 2;

let constants;
constants = {
  themeColor: "#40A8F8",
  botUrl: "https://t.me/TaskDaoBot/app",
  api_url:
    network_type === 1
      ? "http://localhost:5001/api"
      : "https://taskdao-backend-rho.vercel.app/api",
};

export const AUTH_TYPE_ENUM = {
  TELEGRAM: "TELEGRAM",
  METAMASK: "METAMASK",
};

// League levels
export const LEAGUE_LEVEL_DATA = [
  {
    id: 0,
    title: "Student",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-glasses-6530504-5823036.png",
    tapsRequired: 0,
    coinsReward: 0,
  },
  {
    id: 1,
    title: "Intern",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-card-showing-thumbs-up-5669920-4849245.png?f=webp",
    tapsRequired: 5000,
    coinsReward: 5000,
  },
  {
    id: 2,
    title: "Employee",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-learning-on-bank-card-5669906-4849231.png?f=webp",
    tapsRequired: 50000,
    coinsReward: 10000,
  },
  {
    id: 3,
    title: "Manager",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-card-showing-thumbs-up-5669920-4849245.png?f=webp",
    tapsRequired: 250000,
    coinsReward: 30000,
  },
  {
    id: 4,
    title: "Senior Manager",
    img: "/images/level/level3.png",
    tapsRequired: 500000,
    coinsReward: 50000,
  },
  {
    id: 5,
    title: "Management Lead",
    img: "/images/level/level4.png",
    tapsRequired: 1000000,
    coinsReward: 100000,
  },
  {
    id: 6,
    title: "CEO",
    img: "/images/level/level5.png",
    tapsRequired: 2500000,
    coinsReward: 250000,
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
    coinsText: "0",
  },
  {
    level: 1,
    coins: 500000,
    coinsText: "500K",
  },
  {
    level: 2,
    coins: 1000000,
    coinsText: "1M",
  },
  {
    level: 3,
    coins: 2000000,
    coinsText: "2M",
  },
  {
    level: 4,
    coins: 5000000,
    coinsText: "5M",
  },
  {
    level: 5,
    coins: 10000000,
    coinsText: "10M",
  },
];

// Timer data
export const REWARDS_BOOST_DATA = [
  {
    level: 0,
    coins: 0,
    coinsText: "0",
  },
  {
    level: 1,
    coins: 500000,
    coinsText: "500K",
  },
  {
    level: 2,
    coins: 1000000,
    coinsText: "1M",
  },
  {
    level: 3,
    coins: 2000000,
    coinsText: "2M",
  },
  {
    level: 4,
    coins: 5000000,
    coinsText: "5M",
  },
  {
    level: 5,
    coins: 10000000,
    coinsText: "10M",
  },
];

// League levels
export const REFERRAL_COUNT_DATA = [1, 3, 10, 25, 50, 100];

// Special Tasks Data
export const SPECIAL_TASKS_DATA = [
  {
    id: 0,
    title: "Follow Tasker on X",
    pointsText: "100K",
    points: 100000,
    taskNumber: 101,
    type: "SPECIAL",
    url: "https://x.com/tahirahmadin",
  },
  {
    id: 1,
    title: "Like this Tweet",
    pointsText: "100K",
    points: 100000,
    taskNumber: 102,
    type: "SPECIAL",
    url: "https://x.com/tahirahmadin",
  },
  {
    id: 2,
    title: "Retweet this Tweet",
    pointsText: "200K",
    points: 200000,
    taskNumber: 103,
    type: "SPECIAL",
    url: "https://x.com/tahirahmadin",
  },
];

// League Tasks Data
export const LEAGUE_TASKS_DATA = [
  {
    id: 0,
    title: "Intern",
    pointsText: "1M",
    points: 1000000,
    pointsRequired: 500000,
    pointsRequiredText: "5M",
    taskNumber: 201,
    type: "LEAGUE",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-glasses-6530504-5823036.png",
  },
  {
    id: 1,
    title: "Employee",
    pointsText: "2M",
    points: 2000000,
    pointsRequired: 500000,
    pointsRequiredText: "5M",
    taskNumber: 202,
    type: "LEAGUE",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/male-employee-analyzing-data-3378971-2813625@0.png",
  },
  {
    id: 2,
    title: "Manager",
    pointsText: "5M",
    pointsRequired: 500000,
    pointsRequiredText: "5M",
    points: 5000000,
    taskNumber: 203,
    type: "LEAGUE",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/businessman-standing-and-giving-thinking-pose-10543933-8539366.png?f=webp",
  },
  {
    id: 3,
    title: "Senior Manager",
    pointsText: "10M",
    points: 10000000,
    pointsRequired: 500000,
    pointsRequiredText: "5M",
    taskNumber: 204,
    type: "LEAGUE",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/smart-man-is-thinking-wearing-a-gray-office-vest-5557924-4655874.png?f=webp",
  },
  {
    id: 4,
    title: "Head Manager",
    pointsText: "25M",
    points: 25000000,
    pointsRequired: 500000,
    pointsRequiredText: "5M",
    taskNumber: 205,
    type: "LEAGUE",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/businessman-standing-with-coffe-7144482-5807073.png?f=webp",
  },
  {
    id: 5,
    title: "CEO",
    pointsText: "50M",
    points: 50000000,
    pointsRequired: 500000,
    pointsRequiredText: "5M",
    taskNumber: 206,
    type: "LEAGUE",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/businessman-approval-11383354-9395553.png?f=webp",
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
  },
  {
    id: 1,
    title: "Invite 3 friends",
    referralRequired: 3,
    pointsText: "50K",
    points: 50000,
    taskNumber: 302,
    type: "REFERRAL",
  },
  {
    id: 2,
    title: "Invite 10 friends",
    referralRequired: 10,
    pointsText: "200K",
    points: 200000,
    taskNumber: 303,
    type: "REFERRAL",
  },
  {
    id: 3,
    title: "Invite 25 friends",
    referralRequired: 25,
    pointsText: "250K",
    points: 250000,
    taskNumber: 304,
    type: "REFERRAL",
  },
  {
    id: 4,
    title: "Invite 50 friends",
    referralRequired: 50,
    pointsText: "300K",
    points: 300000,
    taskNumber: 305,
    type: "REFERRAL",
  },
  {
    id: 5,
    title: "Invite 100 friends",
    referralRequired: 100,
    pointsText: "500K",
    points: 500000,
    taskNumber: 306,
    type: "REFERRAL",
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
  {
    id: 2,
    title: "What is most suitable category io.net token?",
    option1: "GPU/DePin",
    option2: "Oracle",
    correct: 2,
  },
  {
    id: 3,
    title: "What is most suitable category io.net token?",
    option1: "GPU/DePin",
    option2: "Oracle",
    correct: 2,
  },
  {
    id: 4,
    title: "What is most suitable category io.net token?",
    option1: "GPU/DePin",
    option2: "Oracle",
    correct: 2,
  },
  {
    id: 5,
    title: "What is most suitable category io.net token?",
    option1: "GPU/DePin",
    option2: "Oracle",
    correct: 2,
  },
];

export default constants;
