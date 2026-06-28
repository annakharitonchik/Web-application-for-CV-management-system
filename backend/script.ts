import { prisma } from './lib/prisma';

async function main() {
  await prisma.attribute.create({
    data: {
      categories: 'PERSONAL_INFORMATION',
      name: 'name',
      dataTypes: 'STRING',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
