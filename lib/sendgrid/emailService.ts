// lib/emailService.ts

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export interface EmailData {
  to: string;
  from?: string;
  // Additional dynamic content (e.g., user's name)
  name?: string;
}

// Welcome email 
export async function sendWelcomeEmail(
  data: EmailData 
): Promise<void> {
  await sendgrid.send({
    to: data.to,
    from: data.from || 'info@mysoue.com',
    subject: `Welcome to Mysoue! (mysoue logo)`,
    text: `Hi ${data.name || 'there'},\n\nThank you for signing up for Mysoue wishlist. We're so happy to have you with us!\n\nHere’s how to get started creating your dream wishlist :\n\n- Complete your profile on our platform\n- Create infinity wishlist\n- Explore our pre-made list and products\n\nAccess your account here: https://www.mysoue.com/en/dashboard/my-wishlists\n\nIf you have any questions, our support team is here to help at info@mysoue.com 💌.\n\nLooking forward to seeing your wish come true!\n\nXOXO,\n\nMysoue Team ✨`,
    html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Welcome to Mysoue!</h1>
    <p>Hi ${data.name || 'there'},</p>
    <p>Thank you for signing up for Mysoue wishlist. We're so happy to have you with us!</p>
    <p>Here’s how to get started creating your dream wishlist:</p>
    <ul>
      <li>Complete your profile on our platform</li>
      <li>Create infinity wishlist</li>
      <li>Explore our pre-made list and products</li>
    </ul>
    <p><strong>Access your account here:</strong> <a href="https://www.mysoue.com/en/dashboard/my-wishlists" style="color: #B72228; text-decoration: underline;">https://www.mysoue.com/en/dashboard/my-wishlists</a></p>
    <p>If you have any questions, our support team is here to help at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a> 💌.</p>
    <p>Looking forward to seeing your wish come true!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
  });
}

// 2. Reminder of personal information
export async function sendPersonalInfoReminderEmail(
    data: EmailData & {
      username: string;
      loginLink: string;
      languagePreference: string;
      resetLink: string;
    }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Hey ${data.name || 'there'}, here’s a little reminder for you!`,
      text: `Hey ${data.name || 'there'}!\n\nJust popping in to remind you of your account details so you can always access Mysoue hassle-free!\n\nYour account info:\nUsername: ${data.username}\nEmail: ${data.to}\nLogin here: ${data.loginLink}\nLanguage preference: ${data.languagePreference}\n\nOops, forgot your password? No worries! Reset it here: ${data.resetLink}\n\nNeed any help? Our team is just a message away at info@mysoue.com\n\nCan’t wait to see you on Mysoue!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Just popping in to remind you of your account details so you can always access Mysoue hassle-free!</p>
    <p><strong>Your account info:</strong></p>
    <ul>
      <li><strong>Username:</strong> ${data.username}</li>
      <li><strong>Email:</strong> ${data.to}</li>
      <li><strong>Login here:</strong> <a href="${data.loginLink}" style="color: #B72228; text-decoration: underline;">${data.loginLink}</a></li>
      <li><strong>Language preference:</strong> ${data.languagePreference}</li>
    </ul>
    <p>Oops, forgot your password? No worries!</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.resetLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Reset Password</a>
    </div>
    <p>Need any help? Our team is just a message away at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Can’t wait to see you on Mysoue!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 3. Lost password
  export async function sendLostPasswordEmail(
    data: EmailData & { resetLink: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Time for a fresh start, ${data.name || 'there'}! Reset your password here`,
      text: `Hey ${data.name || 'there'}!\n\nOops! Forgot your password? No worries, it happens to the best of us!\n\nJust click the link below to reset your password and get back to enjoying Mysoue in no time!\n\nReset your password here: ${data.resetLink}\n\nFor security reasons, this link is only valid for 30 minutes.\n\nNeed any help? Just reach out at info@mysoue.com\n\nSee you soon!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Oops! Forgot your password? No worries, it happens to the best of us!</p>
    <p>Just click the button below to reset your password and get back to enjoying Mysoue in no time!</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.resetLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Reset Password</a>
    </div>
    <p>For security reasons, this link is only valid for 30 minutes.</p>
    <p>Need any help? We’re always here for you! Just reach out at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>See you soon!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 4. Change of information/Password
  export async function sendChangeInfoEmail(
    data: EmailData & { updatedInfo: string; resetLink?: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Yay, your account details have been updated! ✨`,
      text: `Hey ${data.name || 'there'}!\n\nJust a quick note to let you know that your account details have been successfully updated on Mysoue.\n\nWhat was changed?\n${data.updatedInfo}\n\nIf you made this change, you’re all set! If not, please reset your password immediately for security reasons: ${data.resetLink || 'N/A'}\n\nNeed help? Reach out to us at info@mysoue.com\n\nStay fabulous!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Just a quick note to let you know that your account details have been successfully updated on Mysoue.</p>
    <p><strong>What was changed?</strong></p>
    <p>${data.updatedInfo}</p>
    <p>If you made this change, you’re all set! If not, please reset your password immediately for security reasons:</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.resetLink || '#'}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Reset Password</a>
    </div>
    <p>Need help? We’re always here for you! Reach out to us at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Stay fabulous!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 5. Creation of a list
  export async function sendListCreationEmail(
    data: EmailData & { listName: string; listLink: string; shareLink: string; deadline?: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Your dreamed wishlist is ready to shine! ✨`,
      text: `Hey ${data.name || 'there'}!\n\nYay! Your wish list "${data.listName}" is officially created on Mysoue and we couldn’t be more excited for you!\n\nYour list name: ${data.listName}\nYour deadline: ${data.deadline || 'N/A'}\nAccess or modify your list here: ${data.listLink}\nShare it with your loved ones: ${data.shareLink}\n\nNow it’s time to make it extra special! Add your favorite items, personalize it, and get ready to receive the perfect gifts.\n\nNeed a hand? Just drop us a message at info@mysoue.com\n\nSending you lots of love & excitement!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Yay! 🎉 Your wish list "<strong>${data.listName}</strong>" is officially created on Mysoue and we couldn’t be more excited for you!</p>
    <p><strong>Your list name:</strong> ${data.listName}</p>
    <p><strong>Your deadline:</strong> ${data.deadline || 'N/A'}</p>
    <div style="margin: 18px 0;">
      <a href="${data.listLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Access or Modify Your List</a>
    </div>
    <div style="margin: 18px 0;">
      <a href="${data.shareLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Share with Loved Ones</a>
    </div>
    <p>Now it’s time to make it extra special! Add your favorite items, personalize it, and get ready to receive the perfect gifts.</p>
    <p>Need a hand? We’re always here for you! Just drop us a message at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Sending you lots of love & excitement!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 6. Finishing the list
  export async function sendListClosingEmail(
    data: EmailData & { listName: string; date: string; listLink: string; summaryLink: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Your ${data.listName} is closing soon! Let’s wrap it up! 🎁`,
      text: `Hey ${data.name || 'there'}!\n\nYour "${data.listName}" is reaching its final moments on Mysoue – what a journey it has been!\n\nHere’s what you need to know:\nClosing date: ${data.date}\nCheck any last-minute gifts here: ${data.listLink}\nDownload your list summary here: ${data.summaryLink}\n\nIf you need extra time or want to make last-minute changes, you can modify anytime.\n\nThank you for letting us be part of your special moments! We hope the gifts you received were above your expectation and that you had everything you dreamed of!\n\nA new occasion is coming, so don’t hesitate to create a new wishlist on Mysoue!\n\nSending you love & happiness!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Your "<strong>${data.listName}</strong>" is reaching its final moments on Mysoue – what a journey it has been!</p>
    <p><strong>Here’s what you need to know:</strong></p>
    <ul>
      <li><strong>Closing date:</strong> ${data.date}</li>
      <li><strong>Check any last-minute gifts here:</strong> <a href="${data.listLink}" style="color: #B72228; text-decoration: underline;">${data.listLink}</a></li>
      <li><strong>Download your list summary here:</strong> <a href="${data.summaryLink}" style="color: #B72228; text-decoration: underline;">${data.summaryLink}</a></li>
    </ul>
    <p>If you need extra time or want to make last-minute changes, you can modify anytime.</p>
    <p>Thank you for letting us be part of your special moments! We hope the gifts you received were above your expectation and that you had everything you dreamed of!</p>
    <p>A new occasion is coming, so don’t hesitate to create a new wishlist on Mysoue!</p>
    <p>Sending you love & happiness!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 7. Gift reserved 
  export async function sendGiftReservedEmail(
    data: EmailData & { listName: string; giftName: string; listLink: string; reserverName: string; name: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Surprise! A gift from your wishlist: ${data.listName} has been reserved on Mysoue! 🎁`,
      text: `Hey ${data.name || 'there'}!\n\nExciting news! ${data.reserverName} has reserved a gift from your wishlist: "${data.listName}" on Mysoue – yay!\n\nGift details:\nItem: ${data.giftName}\nStatus: Reserved\n\nYou can check all the details on our platform: ${data.listLink}\n\nCan't wait to celebrate with you! If you have any questions, we're here at info@mysoue.com\n\nSending you love & excitement!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Exciting news! <strong>${data.reserverName}</strong> has reserved a gift from your wishlist: "<strong>${data.listName}</strong>" on Mysoue – yay!</p>
    <p><strong>Gift details:</strong></p>
    <ul>
      <li><strong>Item:</strong> ${data.giftName}</li>
      <li><strong>Status:</strong> Reserved</li>
    </ul>
    <div style="margin: 18px 0;">
      <a href="${data.listLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">View Wishlist</a>
    </div>
    <p>We can't wait to celebrate with you! If you have any questions, we're here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Sending you love & excitement!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 7b. Gift reservation confirmation (sent to the person who reserved the gift)
  export async function sendGiftReservationConfirmationEmail(
    data: EmailData & { 
      giftName: string; 
      deadline: string; 
      reservationLink: string; 
      wishlistLink: string; 
      name: string; 
    }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `You've reserved a gift for ${data.name}! Don't forget to complete your purchase! 🎁✨`,
      text: `Hey there!

Great news! You've reserved "${data.giftName}" from ${data.name}'s wishlist on Mysoue—they're going to LOVE it!

Here's what you need to do next:
- Complete your purchase before the deadline (${data.deadline})
- Make sure ${data.name} receives their special surprise!

Manage your reservation here: ${data.reservationLink}

Hurry! The wishlist closes soon! Don't miss your chance to be part of this special moment!

Check out the wishlist here: ${data.wishlistLink}

If you have any questions, we're here to help at info@mysoue.com.

PS: Love the idea of thoughtful gifting? Why not treat yourself too? With your very own wishlist, you'll get exactly what you love for any occasion—birthdays, holidays, housewarmings, or just because! No more unwanted gifts—just pure joy, handpicked by you!

Start your wishlist now & let your loved ones surprise you with the perfect gifts: 

https://www.mysoue.com/en/login

XOXO,
Mysoue Team ✨`,
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            @font-face {
              font-family: 'Simple Michael';
              src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
            }
          </style>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="text-align: center; padding: 20px 0;">
              <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 150px;">
            </div>
            
            <div style="background-color: #FFF5F5; border-radius: 15px; padding: 30px; margin: 20px 0;">
              <h1 style="font-family: 'Simple Michael', cursive; color: #A5282C; text-align: center; font-size: 32px;">Hey there! 🎉</h1>
              
              <p style="font-size: 18px; text-align: center;">Great news! You've reserved <br><strong style="color: #A5282C;">"${data.giftName}"</strong><br> from <strong>${data.name}</strong>'s wishlist!</p>

              <div style="background-color: white; border-radius: 10px; padding: 20px; margin: 20px 0;">
                <h2 style="color: #A5282C; font-size: 20px;">Next Steps:</h2>
                <ul style="list-style: none; padding: 0;">
                  <li style="margin: 10px 0;">⏰ Complete purchase by: <strong>${data.deadline}</strong></li>
                  <li style="margin: 10px 0;">🎁 Ensure delivery to <strong>${data.name}</strong></li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.reservationLink}" style="background-color: #A5282C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Manage Reservation</a>
              </div>

              <p style="color: #A5282C; font-weight: bold; text-align: center;">Hurry! The wishlist closes soon! 🕒</p>
              
              <div style="border-top: 2px dashed #A5282C; margin: 30px 0; padding-top: 20px;">
                <p style="font-style: italic; color: #666;">PS: Love thoughtful gifting? Create your own wishlist and let your loved ones surprise you with perfect gifts!</p>
                
                <div style="text-align: center; margin: 20px 0;">
                  <a href="https://www.mysoue.com/en/login" style="background-color: #F5D0D2; color: #A5282C; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold;">Create Your Wishlist</a>
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666;">Questions? Contact us at <a href="mailto:info@mysoue.com" style="color: #A5282C;">info@mysoue.com</a></p>
                <p style="font-family: 'Simple Michael', cursive; color: #A5282C; font-size: 24px;">XOXO,<br>Mysoue Team ✨</p>
              </div>
            </div>
          </div>
        </body>
      </html>`
    });
  }
  
  // 8. Gift purchased
  export async function sendGiftPurchasedEmail(
    data: EmailData & { listName: string; giftName: string; purchaser: string; listLink: string; message?: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Yay! A gift from your wishlist has been purchased – time to say thank you! 🎁✨`,
      text: `Hey ${data.name || 'there'}!\n\nExciting news! Someone special has just purchased a gift from your wishlist: "${data.listName}" on Mysoue – how exciting!\n\nGift details:\nItem: ${data.giftName}\nWho got it: ${data.purchaser}\nStatus: Purchased\n\nThe surprise is on its way!\n\nCheck the gift here: ${data.listLink}\n\nIf you have any questions, we're here at info@mysoue.com\n\nCan't wait for you to unwrap all the love!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Exciting news! Someone special has just purchased a gift from your wishlist: "<strong>${data.listName}</strong>" on Mysoue – how exciting!</p>
    <p><strong>Gift details:</strong></p>
    <ul>
      <li><strong>Item:</strong> ${data.giftName}</li>
      <li><strong>Who got it:</strong> ${data.purchaser}</li>
      <li><strong>Status:</strong> Purchased</li>
    </ul>
    <p>The surprise is on its way!</p>
    <div style="margin: 18px 0;">
      <a href="${data.listLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Check the Gift</a>
    </div>
    <p>If you have any questions, we’re here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Can’t wait for you to unwrap all the love!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 9. Inactivity email (when a user hasn’t used the platform for more than 2 months)
  export async function sendInactivityEmail(
    data: EmailData 
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `We miss you, ${data.name || 'there'}! Let’s make your next celebration unforgettable!`,
      text: `Hey ${data.name || 'there'}!\n\nIt’s been a while since we last saw you on Mysoue, and we miss you!\n\nWhether you’re celebrating a birthday, Valentine’s Day, a housewarming, the holidays, a wedding… or any special moment, we’ve got the trendiest gifts waiting for you!\n\nCome check it out now: https://www.mysoue.com/en/dashboard/my-wishlists\n\nYour dream wishlist is just a few clicks away! Need help? We’re here at info@mysoue.com\n\nCan’t wait to see you back!\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>It’s been a while since we last saw you on Mysoue, and we miss you!</p>
    <p>Whether you’re celebrating…</p>
    <ul>
      <li>A birthday</li>
      <li>Valentine’s Day</li>
      <li>A housewarming</li>
      <li>The holidays</li>
      <li>A wedding</li>
      <li>Or any special moment!</li>
    </ul>
    <p>We’ve got the trendiest gifts waiting for you! Plus, we’re always updating our selection so you can create the perfect wishlist tailored to your style and needs for every occasion.</p>
    <div style="margin: 18px 0;">
      <a href="https://www.mysoue.com/en/dashboard/my-wishlists" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Come check it out now</a>
    </div>
    <p>Your dream wishlist is just a few clicks away! Need help? We’re here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Can’t wait to see you back!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 10. Christmas email (30 days before)
  export async function sendChristmasEmail(
    data: EmailData & { listCreateLink: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Christmas is coming! Time to create your dream wishlist!`,
      text: `Hey ${data.name || 'there'}! 🎄\n\nThe most magical time of the year is just around the corner… and you know what that means? Gifts, surprises, and all the holiday sparkle!\n\nThis year, make sure you get everything you truly want! With Mysoue, you can create your dream wishlist in just a few clicks and share it with your loved ones – no more guessing games!\n\nWhy make your wishlist now?\n- Discover our trendy & personalized gift selection\n- Share your list with friends & family\n- Enjoy a stress-free, magical holiday season\n\nStart your wishlist today: ${data.listCreateLink}\n\nChristmas magic starts now! Need help? We’re here at info@mysoue.com\n\nCan’t wait to make your holidays extra special!\n\nXOXO,\nMysoue Team 🎅`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}! 🎄</h1>
    <p>The most magical time of the year is just around the corner… and you know what that means? <strong>Gifts, surprises, and all the holiday sparkle!</strong></p>
    <p>This year, make sure you get everything you truly want! With Mysoue, you can <strong>create your dream wishlist</strong> in just a few clicks and share it with your loved ones – no more guessing games!</p>
    <p><strong>Why make your wishlist now?</strong></p>
    <ul>
      <li>Discover our trendy & personalized gift selection</li>
      <li>Share your list with friends & family</li>
      <li>Enjoy a stress-free, magical holiday season</li>
    </ul>
    <div style="margin: 18px 0;">
      <a href="${data.listCreateLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Start your wishlist today</a>
    </div>
    <p>Christmas magic starts now! Need help? We’re here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <p>Can’t wait to make your holidays extra special!</p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team 🎅
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 11. Valentine’s email (20 days before)
  export async function sendValentinesEmail(
    data: EmailData & { wishlistLink: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Love is in the air! Create your Valentine’s wishlist now! 💖`,
      text: `Hey ${data.name || 'there'}!\n\nCupid is on the way… and it’s the perfect time to add some love to your wishlist!\n\nWhether you're in a relationship, single, or celebrating self-love, Mysoue helps you create a wishlist filled with gifts you truly love – because you deserve the best!\n\nWhy create your wishlist now?\n- Get gifts you actually want\n- Help your special someone find the perfect surprise\n- Discover our trendy & romantic gift ideas\n\nCreate your wishlist here: ${data.wishlistLink}\n\nLet love (and the perfect gifts) find you! Need help? We’re here at info@mysoue.com\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Cupid is on the way… and it’s the perfect time to add some love to your wishlist!</p>
    <p>Whether you're in a relationship, single, or celebrating self-love, Mysoue helps you create a <strong>wishlist filled with gifts you truly love</strong> – because you deserve the best!</p>
    <p><strong>Why create your wishlist now?</strong></p>
    <ul>
      <li>Get gifts you actually want</li>
      <li>Help your special someone find the perfect surprise</li>
      <li>Discover our trendy & romantic gift ideas</li>
    </ul>
    <div style="margin: 18px 0;">
      <a href="${data.wishlistLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Create your wishlist here</a>
    </div>
    <p>Let love (and the perfect gifts) find you! Need help? We’re here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }
  
  // 12. Birthday reminder email (20 days before)
  export async function sendBirthdayReminderEmail(
    data: EmailData & { wishlistLink: string }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `It’s almost your birthday, ${data.name || 'there'}! Time to make your wishlist!`,
      text: `Hey ${data.name || 'there'}!\n\nYour special day is coming up… and you deserve to be spoiled with gifts you really want!\n\nWith Mysoue, creating your birthday wishlist is super easy – just add your favorite gifts and share it with your loved ones. No more guesswork, just surprises you’ll love!\n\nWhy make your wishlist now?\n- Get the gifts you’ve been dreaming of\n- Make it easy for your friends & family to pick the perfect surprise\n- Discover new trendy & personalized gift ideas\n\nStart your wishlist today: ${data.wishlistLink}\n\nLet’s make this birthday your best one yet! Need help? We’re here at info@mysoue.com\n\nXOXO,\nMysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>Your special day is coming up… and you deserve to be spoiled with gifts you really want!</p>
    <p>With Mysoue, creating your <strong>birthday wishlist</strong> is super easy – just add your favorite gifts and share it with your loved ones. No more guesswork, just surprises you’ll love!</p>
    <p><strong>Why make your wishlist now?</strong></p>
    <ul>
      <li>Get the gifts you’ve been dreaming of</li>
      <li>Make it easy for your friends & family to pick the perfect surprise</li>
      <li>Discover new trendy & personalized gift ideas</li>
    </ul>
    <div style="margin: 18px 0;">
      <a href="${data.wishlistLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Start your wishlist today</a>
    </div>
    <p>Let’s make this birthday your best one yet! Need help? We’re here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }

// sharing wishlist
export async function sendWishlistShareEmail(
    data: EmailData & { 
      name: string; 
      viewWishlistLink: string; 
      wishlistLink: string; 
    }
  ): Promise<void> {
    await sendgrid.send({
      to: data.to,
      from: 'info@mysoue.com',
      subject: `Knock-Knock ✊ someone would like to share his/her wishlist with you!`,
      text: `Hey there,
  
  ${data.name} has created a wishlist on Mysoue and would love for you to check it out! 🎉
  
  But first: What's a wishlist?
  A wishlist is a personal gift list with handpicked items for special events like birthdays, baby showers, weddings, and more! No guessing—just pick a gift they really want. 🎁
  
  Why you’ll love it:
  ✔️ Safe & Free – No need to create an account, just click and see!
  ✔️ Super Easy – Choose and find a perfect gift in just a few clicks.
  ✔️ No extra work – Choose something your close ones will truly love.
  
  Check out ${data.name}’s wishlist now: ${data.viewWishlistLink}
  
  Finding the perfect gift has never been easier! If you have any questions, we’re here to help at info@mysoue.com.
  
  Let’s make ${data.name}’s special occasion extra magical! ✨💖
  
  PS: Want to get the perfect gift for yourself too? Start your own wishlist now! It’s free and easy. No more unwanted gifts—just gifts you truly want!
  PS2: The sky may have limits, but we don’t! Also use our platform to create your personal wishlists, like vision boards, where you can dream big, plan for later or just gather all those “impossible” dreams. With us, you create a reality where anything’s possible - and just one button away: ${data.wishlistLink}
  
  XOXO,
  Mysoue Team ✨`,
      html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <p>Hey there,</p>
    <p><strong>${data.name}</strong> has created a wishlist on Mysoue and would love for you to check it out! 🎉</p>
    <p><strong>But first: What's a wishlist?</strong></p>
    <p>A wishlist is a <strong>personal gift list</strong> with handpicked items for special events like birthdays, baby showers, weddings, and more! No guessing—just pick a gift they really want. 🎁</p>
    <p><strong>Why you’ll love it:</strong></p>
    <ul>
      <li><strong>Safe & Free</strong> – No need to create an account, just click and see!</li>
      <li><strong>Super Easy</strong> – Choose and find a perfect gift in just a few clicks.</li>
      <li><strong>No extra work</strong> – Choose something your close ones will truly love.</li>
    </ul>
    <div style="margin: 18px 0;">
      <a href="${data.viewWishlistLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Check out ${data.name}’s wishlist now</a>
    </div>
    <p>Finding the perfect gift has never been easier! If you have any questions, we’re here to help at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a>.</p>
    <p>Let’s make ${data.name}’s special occasion extra magical! ✨💖</p>
    <p><em>PS: Want to get the perfect gift for yourself too? Start your own wishlist now! It’s free and easy. No more unwanted gifts—just gifts you truly want!</em></p>
    <p><em>PS2: The sky may have limits, but we don’t! Also use our platform to create your personal wishlists, like vision boards, where you can dream big, plan for later or just gather all those “impossible” dreams. With us, you create a reality where anything’s possible - and just one button away:</em></p>
    <div style="margin: 18px 0;">
      <a href="${data.wishlistLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Create your own wishlist</a>
    </div>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
    });
  }

// Gift is canceled
export async function sendGiftCancelationEmail(
  data: EmailData & { 
    listName: string; 
    giftName: string; 
    listLink: string; 
    reserverName: string;
    message?: string;
    name: string;
  }
): Promise<void> {
  await sendgrid.send({
    to: data.to,
    from: 'info@mysoue.com',
    subject: `A gift reservation has been canceled on your wishlist: ${data.listName}`,
    text: `Hey ${data.name || 'there'}!\n\n${data.reserverName} has canceled their reservation for "${data.giftName}" from your wishlist: "${data.listName}" on Mysoue.\n\nGift details:\nItem: ${data.giftName}\nStatus: Canceled\n\nYou can check all the details on our platform: ${data.listLink}\n\nIf you have any questions, we're here at info@mysoue.com\n\nXOXO,\nMysoue Team ✨`,
    html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p><strong>${data.reserverName}</strong> has canceled their reservation for "<strong>${data.giftName}</strong>" from your wishlist: "<strong>${data.listName}</strong>" on Mysoue.</p>
    <p><strong>Gift details:</strong></p>
    <ul>
      <li><strong>Item:</strong> ${data.giftName}</li>
      <li><strong>Status:</strong> Canceled</li>
    </ul>
    <div style="margin: 18px 0;">
      <a href="${data.listLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">View Wishlist</a>
    </div>
    <p>If you have any questions, we're here at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
  });
}

// Email sent to someone who reserved a gift when the wishlist owner deletes the gift
export async function sendGiftDeletedEmail(
  data: EmailData & { 
    listName: string; 
    giftName: string; 
    listLink: string; 
    wishlistOwnerName: string;
    name: string;
  }
): Promise<void> {
  await sendgrid.send({
    to: data.to,
    from: 'info@mysoue.com',
    subject: `The gift you reserved has been removed from the wishlist: ${data.listName}`,
    text: `Hey ${data.name || 'there'}!\n\nWe wanted to let you know that "${data.giftName}" which you reserved from the wishlist "${data.listName}" has been removed by the wishlist owner ${data.wishlistOwnerName}.\n\nWe understand this might be disappointing. Don't worry though - there are still many other wonderful gifts available on this wishlist that you can reserve instead!\n\nYou can browse the remaining gifts here: ${data.listLink}\n\nIf you have any questions, we're here to help at info@mysoue.com\n\nXOXO,\nMysoue Team ✨`,
    html: `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Simple Michael';
      src: url('https://www.mysoue.com/fonts/SimpleMichael.woff2') format('woff2');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Nunito', Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://www.mysoue.com/Symbol/Logo-Mysoue-Symbol_2.png" alt="Mysoue Logo" style="width: 120px;">
    </div>
    <h1 style="font-family: 'Simple Michael', cursive; color: #B72228; text-align: center; font-size: 32px;">Hey ${data.name || 'there'}!</h1>
    <p>We wanted to let you know that "<strong>${data.giftName}</strong>" which you reserved from the wishlist "<strong>${data.listName}</strong>" has been removed by the wishlist owner <strong>${data.wishlistOwnerName}</strong>.</p>
    <p>We understand this might be disappointing. Don't worry though - there are still many other wonderful gifts available on this wishlist that you can reserve instead!</p>
    <div style="margin: 18px 0;">
      <a href="${data.listLink}" style="background-color: #B72228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; display: inline-block; font-weight: bold;">Browse Remaining Gifts</a>
    </div>
    <p>If you have any questions, we're here to help at <a href="mailto:info@mysoue.com" style="color: #B72228;">info@mysoue.com</a></p>
    <div style="text-align: center; margin-top: 30px; font-family: 'Simple Michael', cursive; color: #B72228; font-size: 24px;">
      XOXO,<br>Mysoue Team ✨
    </div>
  </div>
</body>
</html>`
  });
}

