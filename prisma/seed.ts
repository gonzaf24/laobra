import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categories = [
    {
      id: "cemento-ladrillo",
      name: "Cemento y Ladrillo",
      icon: "Grid",
      description: "Nivelación, pegado de suelos y paredes de obra tradicional.",
    },
    {
      id: "yeso-pladur",
      name: "Yeso y Pladur",
      icon: "Layers",
      description: "Tabiquería seca, techos, aislamientos y acabados de yeso.",
    },
    {
      id: "mezclas",
      name: "Mezclas y Proporciones",
      icon: "Droplets",
      description: "Dosificación exacta de agua, cemento y aditivos para cada material.",
    }
  ]

  console.log('Cleaning categories...')
  // Optional: clear existing categories if you want a clean start
  // await prisma.category.deleteMany()

  console.log('Seeding categories...')

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
      },
      create: cat,
    })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
