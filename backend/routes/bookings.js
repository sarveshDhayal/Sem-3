import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Create or update booking (RSVP/Interested)
router.post('/', authenticate, async (req, res) => {
  try {
    const { eventId, status = 'INTERESTED' } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create or update booking
    const booking = await prisma.booking.upsert({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: eventId
        }
      },
      update: { status },
      create: {
        userId: req.user.id,
        eventId: eventId,
        status
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticate, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        event: {
          include: {
            organizer: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get bookings for an event (Organizer only)
router.get('/event/:eventId', authenticate, async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if user is organizer of this event
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to view bookings' });
    }

    const bookings = await prisma.booking.findMany({
      where: { eventId },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get event bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch event bookings' });
  }
});

// Cancel booking
router.delete('/:eventId', authenticate, async (req, res) => {
  try {
    const { eventId } = req.params;

    const booking = await prisma.booking.findUnique({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: eventId
        }
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await prisma.booking.delete({
      where: {
        userId_eventId: {
          userId: req.user.id,
          eventId: eventId
        }
      }
    });

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

export default router;
