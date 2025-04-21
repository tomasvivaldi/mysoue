// app/api/sendEmail/route.ts

import { NextResponse } from 'next/server';
import {
  sendWelcomeEmail, // OK
  sendPersonalInfoReminderEmail, //
  sendLostPasswordEmail, // OK
  sendChangeInfoEmail, // (send email to when update user info AND password?)
  sendListCreationEmail, // Necessary?
  sendListClosingEmail, // 
  sendGiftReservedEmail, // OK
  sendGiftReservationConfirmationEmail, // OK
  sendGiftPurchasedEmail, // OK
  sendInactivityEmail, // Necessary?
  sendChristmasEmail, // Schedule Marketing Campaing
  sendValentinesEmail, // Schedule Marketing Campaing
  sendBirthdayReminderEmail, // Schedule Marketing Campaing??
  sendWishlistShareEmail, //  Necessary?
  sendGiftCancelationEmail, // OK
  sendGiftDeletedEmail, // OK
} from '@/lib/sendgrid/emailService';

interface RequestBody {
  name: string;
  emailType:
    | 'welcome'
    | 'personalInfoReminder'
    | 'lostPassword'
    | 'changeInfo'
    | 'listCreation'
    | 'listClosing'
    | 'giftPurchased'
    | 'inactivity'
    | 'christmas'
    | 'valentine'
    | 'birthdayReminder'
    | 'wishlistShare'
    | 'giftReservationConfirmation'
    | 'giftReservationReminder'
    | 'productDeletion'
    | 'giftCancelation'
    | 'sendGiftReservedEmail'
    | 'sendGiftDeletedEmail';
  to: string;
  // Additional properties for dynamic content (all optional)
  
  username?: string;
  loginLink?: string;
  languagePreference?: string;
  resetLink?: string;
  updatedInfo?: string;
  listName?: string;
  listLink?: string;
  shareLink?: string;
  date?: string;
  summaryLink?: string;
  giftName?: string;
  purchaser?: string;
  listCreateLink?: string;
  wishlistLink?: string;
  wishlistOwnerName?: string;
  productLink?: string;
  cancelLink?: string;
  customerName?: string;
  deadline?: string;
  reservationLink?: string;
  reserverName?: string;
  wishlistName?: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: RequestBody = await request.json();

    // Basic validation for common fields
    if (!body.to || !body.emailType) {
      return NextResponse.json({ error: 'Missing required fields: to and emailType.' }, { status: 400 });
    }

    // Dispatch the email function based on emailType
    switch (body.emailType) {
      case 'welcome':
        if (!body.name) {
          return NextResponse.json({ error: 'Missing required field: platformLink for welcome email.' }, { status: 400 });
        }
        await sendWelcomeEmail(body as (typeof body) & { platformLink: string });
        break;
      case 'personalInfoReminder':
        if (!body.username || !body.loginLink || !body.languagePreference || !body.resetLink) {
          return NextResponse.json(
            { error: 'Missing required fields for personalInfoReminder email. Required: username, loginLink, languagePreference, resetLink.' },
            { status: 400 }
          );
        }
        await sendPersonalInfoReminderEmail(
          body as (typeof body) & { username: string; loginLink: string; languagePreference: string; resetLink: string }
        );
        break;
      case 'lostPassword':
        if (!body.resetLink) {
          return NextResponse.json({ error: 'Missing required field: resetLink for lostPassword email.' }, { status: 400 });
        }
        await sendLostPasswordEmail(body as (typeof body) & { resetLink: string });
        break;
      case 'changeInfo':
        if (!body.updatedInfo) {
          return NextResponse.json({ error: 'Missing required field: updatedInfo for changeInfo email.' }, { status: 400 });
        }
        await sendChangeInfoEmail(body as (typeof body) & { updatedInfo: string; resetLink?: string });
        break;
      case 'listCreation':
        if (!body.listName || !body.listLink || !body.shareLink) {
          return NextResponse.json(
            { error: 'Missing required fields for listCreation email. Required: listName, listLink, shareLink.' },
            { status: 400 }
          );
        }
        await sendListCreationEmail(body as (typeof body) & { listName: string; listLink: string; shareLink: string });
        break;
      case 'listClosing':
        if (!body.listName || !body.date || !body.listLink || !body.summaryLink) {
          return NextResponse.json(
            { error: 'Missing required fields for listClosing email. Required: listName, date, listLink, summaryLink.' },
            { status: 400 }
          );
        }
        await sendListClosingEmail(body as (typeof body) & { listName: string; date: string; listLink: string; summaryLink: string });
        break;
      case 'sendGiftReservedEmail':
        if (!body.listName || !body.giftName || !body.listLink || !body.reserverName || !body.name) {
          return NextResponse.json(
            { error: 'Missing required fields for sendGiftReservedEmail. Required: listName, giftName, listLink, reserverName, name.' },
            { status: 400 }
          );
        }
        await sendGiftReservedEmail(body as (typeof body) & { listName: string; giftName: string; listLink: string; reserverName: string; name: string });
        break;
      case 'giftPurchased':
        if (!body.listName || !body.giftName || !body.purchaser || !body.listLink ) {
          return NextResponse.json(
            { error: 'Missing required fields for giftPurchased email. Required: listName, giftName, purchaser, listLink.' },
            { status: 400 }
          );
        }
        await sendGiftPurchasedEmail(
          body as (typeof body) & { listName: string; giftName: string; purchaser: string; listLink: string; }
        );
        break;
      case 'inactivity':
        if (!body.name) {
          return NextResponse.json({ error: 'Missing required field: platformLink for inactivity email.' }, { status: 400 });
        }
        await sendInactivityEmail(body as (typeof body) & { platformLink: string });
        break;
      case 'christmas':
        if (!body.listCreateLink) {
          return NextResponse.json({ error: 'Missing required field: listCreateLink for christmas email.' }, { status: 400 });
        }
        await sendChristmasEmail(body as (typeof body) & { listCreateLink: string });
        break;
      case 'valentine':
        if (!body.wishlistLink) {
          return NextResponse.json({ error: 'Missing required field: wishlistLink for valentine email.' }, { status: 400 });
        }
        await sendValentinesEmail(body as (typeof body) & { wishlistLink: string });
        break;
      case 'birthdayReminder':
        if (!body.wishlistLink) {
          return NextResponse.json({ error: 'Missing required field: wishlistLink for birthdayReminder email.' }, { status: 400 });
        }
        await sendBirthdayReminderEmail(body as (typeof body) & { wishlistLink: string });
        break;
      case 'wishlistShare':
        if (!body.name || 
            // !body.viewWishlistLink || 
            !body.wishlistLink) {
          return NextResponse.json(
            { error: 'Missing required fields for wishlistShare email. Required: wishlistOwnerName, viewWishlistLink, wishlistLink.' },
            { status: 400 }
          );
        }
        await sendWishlistShareEmail(
          body as (typeof body) & { wishlistOwnerName: string; viewWishlistLink: string; wishlistLink: string }
        );
        break;
      case 'giftReservationConfirmation':
        if (
          !body.giftName ||
          !body.deadline ||
          !body.reservationLink ||
          !body.wishlistLink ||
          !body.name
        ) {
          return NextResponse.json(
            { error: 'Missing required fields for giftReservationConfirmation email. Required: giftName, deadline, reservationLink, wishlistLink, name.' },
            { status: 400 }
          );
        }
        await sendGiftReservationConfirmationEmail(
          body as (typeof body) & {
            giftName: string;
            deadline: string;
            reservationLink: string;
            wishlistLink: string;
            name: string;
          }
        );
        break;
      case 'giftCancelation':
        if (!body.listName || !body.giftName || !body.listLink || !body.reserverName || !body.name) {
          return NextResponse.json(
            { error: 'Missing required fields for giftCancelation email. Required: listName, giftName, listLink, reserverName.' },
            { status: 400 }
          );
        }
        await sendGiftCancelationEmail(
          body as (typeof body) & { listName: string; giftName: string; listLink: string; reserverName: string; name: string }
        );
        break;
      case 'sendGiftDeletedEmail':
        if (!body.listName || !body.giftName || !body.listLink || !body.wishlistOwnerName || !body.name) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        await sendGiftDeletedEmail(
          body as (typeof body) & {
            listName: string;
            giftName: string;
            listLink: string;
            wishlistOwnerName: string;
            name: string;
          }
        );
        break;
      default:
        return NextResponse.json({ error: 'Invalid email type.' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in sendEmail route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}