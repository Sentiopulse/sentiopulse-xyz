import { PrismaClient, Sentiment, Source } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      title: "How to earn crypto in 2025",
      content: "Learn how to earn Bitcoin and Ethereum by staking and trading.",
      sentiment: "BULLISH",
      source: "REDDIT",
      signalTime: faker.date.recent(),
    },
    {
      title: "Earning passive income with DeFi",
      content: "Earning rewards through liquidity pools is becoming popular.",
      sentiment: "BULLISH",
      source: "TWITTER",
      signalTime: faker.date.recent(),
    },
    {
      title: "Top strategies for earning crypto",
      content:
        "Discover top strategies for earning and growing your crypto portfolio.",
      sentiment: "NEUTRAL",
      source: "YOUTUBE",
      signalTime: faker.date.recent(),
    },
    {
      title: "Has anyone earned big from altcoins?",
      content: "Many have earned significant profits from altcoin investments.",
      sentiment: "BULLISH",
      source: "TELEGRAM",
      signalTime: faker.date.recent(),
    },
    {
      title: "Crypto earning tips",
      content: "Tips for earning crypto safely and securely.",
      sentiment: "NEUTRAL",
      source: "FARCASTER",
      signalTime: faker.date.recent(),
    },
    {
      title: "Bitcoin price prediction",
      content: "Experts predict Bitcoin will reach new highs this year.",
      sentiment: "BULLISH",
      source: "REDDIT",
      signalTime: faker.date.recent(),
    },
    {
      title: "Ethereum staking guide",
      content: "Earn rewards by staking your Ethereum.",
      sentiment: "BULLISH",
      source: "TWITTER",
      signalTime: faker.date.recent(),
    },
    {
      title: "Crypto market trends",
      content: "The crypto market is showing bullish trends in 2025.",
      sentiment: "BULLISH",
      source: "YOUTUBE",
      signalTime: faker.date.recent(),
    },
    {
      title: "Blockchain technology explained",
      content: "Blockchain is revolutionizing finance and supply chains.",
      sentiment: "NEUTRAL",
      source: "TELEGRAM",
      signalTime: faker.date.recent(),
    },
    {
      title: "Altcoin earning opportunities",
      content: "Explore new earning opportunities with altcoins.",
      sentiment: "BULLISH",
      source: "FARCASTER",
      signalTime: faker.date.recent(),
    },
  ].map((post) => ({
    ...post,
    sentiment: post.sentiment as Sentiment,
    source: post.source as Source,
  }));
  await prisma.post.deleteMany({});
  await prisma.post.createMany({
    data: posts,
  });

  console.log("Seeded crypto-related posts for full-text search testing!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
