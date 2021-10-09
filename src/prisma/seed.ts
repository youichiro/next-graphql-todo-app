import prisma from '../lib/prisma';

const main = async () => {
  const user = await prisma.user.upsert({
    where: { email: 'seed@prisma.io' },
    update: {},
    create: {
      name: 'bob',
      email: 'seed@prisma.io',
      projects: {
        create: [
          {
            name: 'sample project',
            tasks: {
              create: [
                {
                  title: 'sample task 1',
                  description: 'hoge huga piyo',
                },
              ],
            },
          },
        ],
      },
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
