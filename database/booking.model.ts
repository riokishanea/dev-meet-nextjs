import mongoose, { Schema, Document, Model } from 'mongoose';
import Event from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // Basic email format check (simplified, not full RFC 5322)
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create index on eventId for faster queries when fetching bookings by event
BookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to validate that the referenced event exists
 * Throws an error if the event doesn't exist in the database
 */
BookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's modified or new
  if (this.isModified('eventId') || this.isNew) {
    try {
      const eventExists = await Event.findById(this.eventId);
      
      if (!eventExists) {
        return next(new Error('Referenced event does not exist'));
      }
    } catch (error) {
      return next(new Error('Failed to validate event reference'));
    }
  }

  next();
});

// Prevent model overwrite during hot reloads in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
