import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const posts = Array.from({ length: 5 }).map(() => ({
    title: faker.helpers.arrayElement([
      "Bitcoin Hits New Highs",
      "Ethereum's Future in DeFi",
      "The Rise of Crypto Wallets",
      "Blockchain Revolution",
      "Crypto Market Trends",
    ]), // Generate crypto-related titles
    content: faker.helpers.arrayElement([
      "Bitcoin is reaching new all-time highs as investors flock to digital assets.",
      "Ethereum's role in decentralized finance continues to grow, attracting developers worldwide.",
      "The adoption of crypto wallets is on the rise, making digital payments more accessible.",
      "Blockchain technology is revolutionizing industries from finance to supply chain.",
      "Experts predict significant trends in the crypto market for the upcoming year.",
    ]), // Generate crypto-related content
    sentiment: faker.helpers.arrayElement(["BULLISH", "NEUTRAL", "BEARISH"]),
    source: faker.internet.domainName(),
    signalTime: faker.date.recent(),
    published: faker.datatype.boolean(),
  }));

  await prisma.post.createMany({
    data: posts,
  });

  console.log("Seeded 5 crypto-related posts with updated titles and content!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
