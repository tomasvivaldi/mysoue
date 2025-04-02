// app/api/sendEmail/route.ts

import { NextResponse } from 'next/server';
import {
  sendWelcomeEmail, // OK
  sendPersonalInfoReminderEmail, //
  sendLostPasswordEmail, // Make page as well
  sendChangeInfoEmail, //
  sendListCreationEmail, // Necessary?
  sendListClosingEmail, // 
  sendGiftReservedEmail, //
  sendGiftPurchasedEmail, //
  sendInactivityEmail, // Necessary?
  sendChristmasEmail, // Schedule Marketing Campaing
  sendValentinesEmail, // Schedule Marketing Campaing
  sendBirthdayReminderEmail, // Schedule Marketing Campaing??
  sendWishlistShareEmail, // 
  sendGiftReservationConfirmationEmail, //
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
    | 'giftReserved'
    | 'giftPurchased'
    | 'inactivity'
    | 'christmas'
    | 'valentine'
    | 'birthdayReminder'
    | 'wishlistShare'
    | 'giftReservationConfirmation'
    | 'giftReservationReminder'
    | 'productDeletion';
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
  thankYouLink?: string;
  listCreateLink?: string;
  createWishlistLink?: string;
  wishlistOwnerName?: string;
  productLink?: string;
  cancelLink?: string;
  customerName?: string;
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
      case 'giftReserved':
        if (!body.listName || !body.giftName || !body.listLink) {
          return NextResponse.json(
            { error: 'Missing required fields for giftReserved email. Required: listName, giftName, listLink.' },
            { status: 400 }
          );
        }
        await sendGiftReservedEmail(body as (typeof body) & { listName: string; giftName: string; listLink: string });
        break;
      case 'giftPurchased':
        if (!body.listName || !body.giftName || !body.purchaser || !body.listLink || !body.thankYouLink) {
          return NextResponse.json(
            { error: 'Missing required fields for giftPurchased email. Required: listName, giftName, purchaser, listLink, thankYouLink.' },
            { status: 400 }
          );
        }
        await sendGiftPurchasedEmail(
          body as (typeof body) & { listName: string; giftName: string; purchaser: string; listLink: string; thankYouLink: string }
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
        if (!body.createWishlistLink) {
          return NextResponse.json({ error: 'Missing required field: createWishlistLink for valentine email.' }, { status: 400 });
        }
        await sendValentinesEmail(body as (typeof body) & { createWishlistLink: string });
        break;
      case 'birthdayReminder':
        if (!body.createWishlistLink) {
          return NextResponse.json({ error: 'Missing required field: createWishlistLink for birthdayReminder email.' }, { status: 400 });
        }
        await sendBirthdayReminderEmail(body as (typeof body) & { createWishlistLink: string });
        break;
      case 'wishlistShare':
        if (!body.wishlistOwnerName || 
            // !body.viewWishlistLink || 
            !body.createWishlistLink) {
          return NextResponse.json(
            { error: 'Missing required fields for wishlistShare email. Required: wishlistOwnerName, viewWishlistLink, createWishlistLink.' },
            { status: 400 }
          );
        }
        await sendWishlistShareEmail(
          body as (typeof body) & { wishlistOwnerName: string; viewWishlistLink: string; createWishlistLink: string }
        );
        break;
      case 'giftReservationConfirmation':
        if (
          !body.giftName ||
        //   !body.deadline ||
        //   !body.purchaseLink ||
          !body.cancelLink ||
          !body.createWishlistLink ||
          !body.wishlistOwnerName
        ) {
          return NextResponse.json(
            { error: 'Missing required fields for giftReservationConfirmation email. Required: giftName, deadline, purchaseLink, cancelLink, createWishlistLink, wishlistOwnerName.' },
            { status: 400 }
          );
        }
        await sendGiftReservationConfirmationEmail(
          body as (typeof body) & {
            giftName: string;
            deadline: string;
            purchaseLink: string;
            cancelLink: string;
            createWishlistLink: string;
            wishlistOwnerName: string;
          }
        );
        break;
    //   case 'giftReservationReminder':
    //     if (
    //       !body.giftName ||
    //       !body.wishlistOwnerName ||
    //     //   !body.deadline ||
    //       !body.productLink ||
    //       !body.cancelLink ||
    //       !body.createWishlistLink
    //     ) {
    //       return NextResponse.json(
    //         { error: 'Missing required fields for giftReservationReminder email. Required: giftName, wishlistOwnerName, deadline, productLink, cancelLink, createWishlistLink.' },
    //         { status: 400 }
    //       );
    //     }
    //     await sendGiftReservationReminderEmail(
    //       body as (typeof body) & {
    //         giftName: string;
    //         wishlistOwnerName: string;
    //         deadline: string;
    //         productLink: string;
    //         cancelLink: string;
    //         createWishlistLink: string;
    //       }
    //     );
    //     break;
    //   case 'productDeletion':
    //     if (!body.customerName) {
    //       return NextResponse.json({ error: 'Missing required field: customerName for productDeletion email.' }, { status: 400 });
    //     }
    //     await sendProductDeletionEmail(body as (typeof body) & { customerName: string });
    //     break;

      default:
        return NextResponse.json({ error: 'Invalid email type.' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in sendEmail route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}