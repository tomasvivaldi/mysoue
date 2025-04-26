import { z } from 'zod';

// User validation schemas
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  image: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Product validation schemas
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0),
  imageUrl: z.string().url().optional(),
  brand: z.string().max(100).optional(),
  storeLink: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Wishlist validation schemas
export const wishlistSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  dueDate: z.date().optional(),
  shippingAddress: z.string().max(500).optional(),
  isPublic: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Reservation validation schemas
export const reservationSchema = z.object({
  id: z.string(),
  productId: z.string(),
  wishlistId: z.string(),
  reserverName: z.string().min(1).max(100),
  reserverEmail: z.string().email(),
  privateMessage: z.string().max(500).optional(),
  status: z.enum(['reserved', 'purchased', 'cancelled']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// API request validation schemas
export const createWishlistSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  dueDate: z.date().optional(),
  shippingAddress: z.string().max(500).optional(),
  isPublic: z.boolean(),
});

export const updateWishlistSchema = createWishlistSchema.partial();

export const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0),
  imageUrl: z.string().url().optional(),
  brand: z.string().max(100).optional(),
  storeLink: z.string().url().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createReservationSchema = z.object({
  productId: z.string(),
  wishlistId: z.string(),
  reserverName: z.string().min(1).max(100),
  reserverEmail: z.string().email(),
  privateMessage: z.string().max(500).optional(),
}); 