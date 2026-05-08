import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categories = [
    {
      id: "demolicion",
      name: "Demoliciones",
      icon: "Trash2",
      description: "Seguridad, protección y gestión de escombros.",
    },
    {
      id: "tabiqueria",
      name: "Tabiquería y Pladur",
      icon: "Layers",
      description: "Nivelación de perfiles y tratamiento de juntas.",
    },
    // ... rest of categories
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    })
  }

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
