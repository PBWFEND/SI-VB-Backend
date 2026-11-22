
import prisma from "../../client.js";

const main = async () => {
  const pengguna = await prisma.pengguna.update({
    where: {
      id: 5,
    },
    data: {
      role: "staf",
    },
    select: {
      id: true,
      nama: true,
      email: true,
      role: true,
    },
  });

  console.log("Role berhasil diperbarui:");
  console.table([pengguna]);
};

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
