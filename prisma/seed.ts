import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  await prisma.comment.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      return prisma.user.create({
        data: {
          id: "1",
          name: faker.person.fullName(),
          email: faker.internet.email(),
          image: faker.image.avatarGitHub(),
          emailVerified: faker.date.past(),
        },
      });
    })
  );

  const photos = await Promise.all(
    users.map((user) =>
      prisma.photo.create({
        data: {
          id: "1",
          url: faker.image.urlLoremFlickr({ category: "nature" }),
          caption: faker.lorem.sentence(),
          userId: user.id,
        },
      })
    )
  );

  await Promise.all(
    photos.map((photo) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      return prisma.comment.create({
        data: {
          id: "1",
          text: faker.lorem.paragraph(),
          userId: randomUser.id,
          photoId: photo.id,
        },
      });
    })
  );

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
