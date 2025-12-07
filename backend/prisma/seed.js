import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create organizer user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@localconnect.com' },
    update: {},
    create: {
      email: 'organizer@localconnect.com',
      password: hashedPassword,
      name: 'Event Organizer',
      role: 'ORGANIZER'
    }
  });

  console.log('Created organizer user');

  // Create regular user
  const user = await prisma.user.upsert({
    where: { email: 'user@localconnect.com' },
    update: {},
    create: {
      email: 'user@localconnect.com',
      password: hashedPassword,
      name: 'John Doe',
      role: 'USER'
    }
  });

  console.log('Created regular user');

  // Sample events data - After December 24, 2025 (Delhi & Jaipur locations)
  const events = [
    {
      title: 'Year-End Photography Workshop',
      description: 'Capture amazing holiday photos! Learn lighting, composition, and editing techniques.',
      location: 'India Habitat Centre, Lodhi Road, New Delhi',
      category: 'art',
      date: new Date('2025-12-26T13:00:00'),
      price: 1500,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Winter Tech Meetup',
      description: 'Year-end tech talks and networking! Discuss 2025 trends and 2026 predictions. Free snacks and chai!',
      location: 'Jawahar Kala Kendra, Jaipur, Rajasthan',
      category: 'tech',
      date: new Date('2025-12-27T18:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Bollywood Dance Workshop',
      description: 'Learn popular Bollywood dance moves! Fun session for all ages and skill levels.',
      location: 'Kamani Auditorium, Copernicus Marg, New Delhi',
      category: 'workshop',
      date: new Date('2025-12-28T16:00:00'),
      price: 800,
      image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
      organizerId: organizer.id
    },
    {
      title: 'New Year Tech Summit 2026',
      description: 'Start 2026 with cutting-edge tech insights! AI, Web3, and future technology trends.',
      location: 'Pragati Maidan, New Delhi',
      category: 'tech',
      date: new Date('2025-12-30T10:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      organizerId: organizer.id
    },
    {
      title: 'New Year\'s Eve Gala Concert',
      description: 'Ring in 2026 with an unforgettable night of live music, dancing, and celebration!',
      location: 'Jaipur Exhibition & Convention Centre (JECC), Jaipur',
      category: 'music',
      date: new Date('2025-12-31T20:00:00'),
      price: 2500,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
      organizerId: organizer.id
    },
    {
      title: 'New Year Marathon 2026',
      description: 'Start the year running! 5K, 10K, and full marathon options available.',
      location: 'India Gate, Rajpath, New Delhi',
      category: 'sports',
      date: new Date('2026-01-01T07:00:00'),
      price: 800,
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Yoga & Meditation Retreat',
      description: 'Start 2026 fresh! Full day of yoga, meditation, and wellness activities.',
      location: 'Central Park, Connaught Place, New Delhi',
      category: 'sports',
      date: new Date('2026-01-03T08:00:00'),
      price: 1200,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Python & AI Workshop',
      description: 'Hands-on workshop covering Python, machine learning, and AI applications.',
      location: 'Birla Auditorium, Statue Circle, Jaipur',
      category: 'tech',
      date: new Date('2026-01-05T10:00:00'),
      price: 3500,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Winter Jazz Festival',
      description: 'Cozy up with smooth jazz performances featuring local and international artists!',
      location: 'Siri Fort Auditorium, August Kranti Marg, New Delhi',
      category: 'music',
      date: new Date('2026-01-08T19:00:00'),
      price: 1000,
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Winter Music Festival',
      description: 'Three days of amazing performances from indie and rock bands!',
      location: 'Jawaharlal Nehru Stadium, Pragati Vihar, New Delhi',
      category: 'music',
      date: new Date('2026-01-10T14:00:00'),
      price: 2000,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
      organizerId: organizer.id
    },
    {
      title: 'React & TypeScript Workshop',
      description: 'Learn React 18 with TypeScript. Build a full-stack app in one day!',
      location: 'WeWork Galaxy, Sector 62, Noida',
      category: 'tech',
      date: new Date('2026-01-12T09:00:00'),
      price: 2999,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Startup Pitch Competition',
      description: 'Watch innovative startups pitch to investors. Network with founders and VCs!',
      location: 'Rajasthan International Centre, Jaipur',
      category: 'tech',
      date: new Date('2026-01-15T15:00:00'),
      price: 500,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Winter Art Exhibition',
      description: 'Explore beautiful winter-themed art from local artists. Perfect for art lovers!',
      location: 'National Gallery of Modern Art, Jaipur House, New Delhi',
      category: 'art',
      date: new Date('2026-01-18T11:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Contemporary Art Showcase',
      description: 'Featured works from emerging artists. Refreshments included.',
      location: 'Albert Hall Museum, Ram Niwas Garden, Jaipur',
      category: 'art',
      date: new Date('2026-01-20T17:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Republic Day Celebration Concert',
      description: 'Celebrate Republic Day with patriotic songs and cultural performances!',
      location: 'Red Fort, Chandni Chowk, New Delhi',
      category: 'music',
      date: new Date('2026-01-26T18:00:00'),
      price: 500,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Heritage Walk & Photography',
      description: 'Explore the Pink City with expert guides. Capture stunning architectural photos!',
      location: 'Hawa Mahal, Badi Choupad, Jaipur',
      category: 'art',
      date: new Date('2026-01-28T09:00:00'),
      price: 600,
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Food & Culture Festival',
      description: 'Taste authentic Rajasthani and Delhi street food. Live cultural performances!',
      location: 'Dilli Haat, INA Market, New Delhi',
      category: 'workshop',
      date: new Date('2026-02-01T12:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Cricket Tournament',
      description: 'Inter-city cricket tournament. Register your team now! Prizes worth ₹50,000!',
      location: 'Feroz Shah Kotla Ground, Bahadur Shah Zafar Marg, Delhi',
      category: 'sports',
      date: new Date('2026-02-05T08:00:00'),
      price: 2000,
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
      organizerId: organizer.id
    }
  ];

  // Create events
  for (const eventData of events) {
    await prisma.event.create({
      data: eventData
    });
  }

  console.log(`Created ${events.length} upcoming events`);

  // Add some past events (October-November 2024) to show "Event Ended" feature (Delhi & Jaipur)
  const pastEvents = [
    {
      title: 'Diwali Tech Meetup',
      description: 'Celebrate Diwali with coding challenges and tech talks. Traditional snacks provided!',
      location: 'Select Citywalk Mall, Saket, New Delhi',
      category: 'tech',
      date: new Date('2024-10-31T18:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Autumn Classical Music Festival',
      description: 'Three days of amazing classical music performances featuring renowned artists.',
      location: 'Ravindra Manch, Jaipur, Rajasthan',
      category: 'music',
      date: new Date('2024-11-05T19:00:00'),
      price: 1000,
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Delhi Half Marathon 2024',
      description: 'Annual marathon with 5K, 10K, and half marathon options. Perfect weather!',
      location: 'India Gate, Rajpath, New Delhi',
      category: 'sports',
      date: new Date('2024-11-10T07:00:00'),
      price: 700,
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Modern Art Exhibition',
      description: 'Featured works from emerging Indian artists. Refreshments included.',
      location: 'Lalit Kala Akademi, Rabindra Bhavan, New Delhi',
      category: 'art',
      date: new Date('2024-11-15T17:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Python & Django Conference',
      description: 'Two-day conference covering Django, FastAPI, and Python best practices.',
      location: 'Manipal University, Jaipur, Rajasthan',
      category: 'tech',
      date: new Date('2024-11-18T09:00:00'),
      price: 2500,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Street Food Festival',
      description: 'Taste authentic street food from Delhi and Rajasthan. Family-friendly event!',
      location: 'Connaught Place, New Delhi',
      category: 'workshop',
      date: new Date('2024-11-23T12:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      organizerId: organizer.id
    },
    {
      title: 'Tech Shopping Festival',
      description: 'Learn about the best tech deals and gadgets. Exclusive discounts and demos!',
      location: 'Ambience Mall, Vasant Kunj, New Delhi',
      category: 'tech',
      date: new Date('2024-11-29T10:00:00'),
      price: 0,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      organizerId: organizer.id
    }
  ];

  for (const eventData of pastEvents) {
    await prisma.event.create({
      data: eventData
    });
  }

  console.log(`Created ${pastEvents.length} past events (for demo)`);
  console.log('\n Test Credentials:');
  console.log('Organizer: organizer@localconnect.com / password123');
  console.log('User: user@localconnect.com / password123');
  console.log('\n Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
