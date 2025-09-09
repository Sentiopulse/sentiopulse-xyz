import { faker } from "@faker-js/faker";
import { PrismaClient, Sentiment, Source } from "@prisma/client";

const SENTIMENTS = ["BULLISH", "BEARISH", "NEUTRAL"];
const SOURCES = ["REDDIT", "TWITTER", "YOUTUBE", "TELEGRAM", "FARCASTER"];
const CATEGORIES = [
  "DeFi",
  "NFTs",
  "Trading",
  "Staking",
  "Passive Income",
  "Altcoins",
  "Market Trends",
  "Safety",
  "Tips",
  "Earning",
];
const SUB_CATEGORIES = [
  "Liquidity Pools",
  "Yield Farming",
  "Bitcoin",
  "Ethereum",
  "Opportunities",
  "Security",
  "2025",
  "Bullish",
  "Bearish",
  "Regulation",
  "Wallets",
  "Exchanges",
  "Layer 2",
  "Airdrops",
  "Governance",
];


const TITLES = [
  "How to earn crypto in 2025",
  "Passive income with DeFi",
  "Crypto market trends 2025",
  "Altcoin earning opportunities",
  "Crypto safety tips",
  "NFTs: The next big thing",
  "Staking strategies for Ethereum",
  "DeFi risks and rewards",
  "Top 5 crypto wallets",
  "Regulation and the future of crypto",
];

const CONTENTS = [
  "Learn how to earn Bitcoin and Ethereum by staking and trading.",
  "Liquidity pools and yield farming for passive crypto income.",
  "Analysis of bullish trends in the crypto market for 2025.",
  "Explore new earning opportunities with altcoins.",
  "Tips for earning crypto safely and securely.",
  "NFTs are changing the digital art landscape.",
  "How to maximize returns with Ethereum staking.",
  "Understanding the risks and rewards in DeFi protocols.",
  "A review of the top 5 crypto wallets for security.",
  "How regulation could impact the future of cryptocurrencies.",
];

const prisma = new PrismaClient();

async function main() {
  const posts = Array.from({ length: 10 }).map((_, i) => ({
    title: TITLES[i % TITLES.length],
    content: CONTENTS[i % CONTENTS.length],
    sentiment: faker.helpers.arrayElement(SENTIMENTS) as Sentiment,
    source: faker.helpers.arrayElement(SOURCES) as Source,
    categories: faker.helpers.arrayElements(
      CATEGORIES,
      faker.number.int({ min: 1, max: 2 })
    ),
    subcategories: faker.helpers.arrayElements(
      SUB_CATEGORIES,
      faker.number.int({ min: 3, max: 5 })
    ),
  }));
  await prisma.$transaction([
    prisma.post.deleteMany({}),
    prisma.post.createMany({ data: posts }),
  ]);

  console.log("Seeded 10 crypto-related posts with categories and subcategories!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
