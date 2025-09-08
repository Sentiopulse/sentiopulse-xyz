import { PrismaClient, Sentiment, Source } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      title: "How to earn crypto in 2025",
      content: "Learn how to earn Bitcoin and Ethereum by staking and trading.",
      sentiment: "BULLISH" as Sentiment,
      source: "TWITTER" as Source,
      signalTime: faker.date.recent(),
      category: ["Earning", "Staking"],
      subcategory: ["Bitcoin", "Ethereum"],
    },
    {
      title: "Passive income with DeFi",
      content: "Liquidity pools and yield farming for passive crypto income.",
      sentiment: "BULLISH" as Sentiment,
      source: "TELEGRAM" as Source,
      signalTime: faker.date.recent(),
      category: ["DeFi", "Passive Income"],
      subcategory: ["Liquidity Pools", "Yield Farming"],
    },
    {
      title: "Crypto market trends 2025",
      content: "Analysis of bullish trends in the crypto market for 2025.",
      sentiment: "BULLISH" as Sentiment,
      source: "TWITTER" as Source,
      signalTime: faker.date.recent(),
      category: ["Market Trends"],
      subcategory: ["2025", "Bullish"],
    },
    {
      title: "Altcoin earning opportunities",
      content: "Explore new earning opportunities with altcoins.",
      sentiment: "BULLISH" as Sentiment,
      source: "TELEGRAM" as Source,
      signalTime: faker.date.recent(),
      category: ["Altcoins", "Earning"],
      subcategory: ["Opportunities"],
    },
    {
      title: "Crypto safety tips",
      content: "Tips for earning crypto safely and securely.",
      sentiment: "NEUTRAL" as Sentiment,
      source: "TWITTER" as Source,
      signalTime: faker.date.recent(),
      category: ["Safety", "Tips"],
      subcategory: ["Security"],
    },
  ];
  await prisma.post.deleteMany({});
  await prisma.post.createMany({
    data: posts,
  });

  console.log("Seeded 5 crypto-related posts with category and subcategory!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
