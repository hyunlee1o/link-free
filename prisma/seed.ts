import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import cuid from 'cuid'
import dotenv from 'dotenv'

const prisma = new PrismaClient()

dotenv.config({
  path: './.env'
})

async function main() {
  const data = {
    settings: {
      avatar: 'https://ucarecdn.com/cd0ece6a-1d16-4405-947d-9a71d1b7a6cd/avatar.png',
      name: 'John Doe',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam consectetur, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod.',
      font: 'oswald',
      buttonBorderRadius: '4',
      colors: {
        texts: '#e11d48',
        icons: '#e11d48',
        background: '#f8fafc',
        buttonLabelColor: '#f8fafc',
        buttonBackgroundColor: '#e11d48',
        buttonBorderColor: '#e11d48'
      }
    },
    socialLinks: {
      Facebook: '1',
      Instagram: '2',
      Snapchat: '3',
      Twitter: '4',
      Messenger: '5',
      WhatsApp: '',
      LinkedIn: '',
      GitHub: '',
      Dev: '',
      Medium: '',
      YouTube: '',
      Twitch: '',
      Discord: '',
      Steam: '',
      Email: ''
    },
    buttonLinks: [
      {
        id: cuid(),
        label: 'Home',
        href: '#'
      },
      {
        id: cuid(),
        label: 'About',
        href: '#'
      },
      {
        id: cuid(),
        label: 'Contact',
        href: '#'
      }
    ]
  }

  const hasData = await prisma.data.findUnique({
    where: { id: 1 }
  })

  if (!hasData) {
    await prisma.data.create({
      data: {
        id: 1,
        data: JSON.stringify(data)
      }
    })
  }

  const hasUser = await prisma.user.findFirst()

  if (!hasUser) {
    const { USERNAME, PASSWORD } = process.env

    if (!USERNAME || !PASSWORD) {
      throw new Error('USERNAME and PASSWORD env variables are required')
    }

    await prisma.user.create({
      data: {
        id: 1,
        username: USERNAME,
        password: hashSync(PASSWORD, 10),
        lang: 'en',
        role: 'ADMIN'
      }
    })
  }
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
