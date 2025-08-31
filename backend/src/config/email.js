const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send commission confirmation email to customer
const sendCommissionConfirmation = async (commission) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: commission.email,
    subject: 'Commission Request Confirmed - Artist Portfolio',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your commission request!</h2>
        <p>Dear ${commission.customerName},</p>
        <p>We have received your commission request and will get back to you soon.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Commission Details:</h3>
          <p><strong>Size:</strong> ${commission.size}</p>
          <p><strong>Medium:</strong> ${commission.medium}</p>
          <p><strong>Number of Persons:</strong> ${commission.numberOfPersons}</p>
          <p><strong>Deadline:</strong> ${new Date(commission.deadline).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> $${commission.totalPrice}</p>
          <p><strong>Description:</strong> ${commission.description}</p>
        </div>
        
        <p>We will review your request and contact you within 24-48 hours to discuss the next steps.</p>
        <p>Best regards,<br>Artist Portfolio Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to customer');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

// Send commission notification email to artist
const sendCommissionNotification = async (commission, referenceImageUrls = []) => {
  const transporter = createTransporter();
  
  const imagesList = referenceImageUrls.length > 0 
    ? referenceImageUrls.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join('')
    : '<li>No reference images uploaded</li>';
  
  const shippingInfo = commission.shippingAddress && commission.shippingAddress.street
    ? `
      <p><strong>Shipping Address:</strong></p>
      <p>${commission.shippingAddress.street}<br>
      ${commission.shippingAddress.city}, ${commission.shippingAddress.state} ${commission.shippingAddress.zipCode}<br>
      ${commission.shippingAddress.country}</p>
    `
    : '<p><strong>Shipping Address:</strong> Not provided</p>';

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ARTIST_EMAIL,
    subject: 'New Commission Request Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Commission Request</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Customer Information:</h3>
          <p><strong>Name:</strong> ${commission.customerName}</p>
          <p><strong>Email:</strong> ${commission.email}</p>
          <p><strong>Phone:</strong> ${commission.phone || 'Not provided'}</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Commission Details:</h3>
          <p><strong>Size:</strong> ${commission.size}</p>
          <p><strong>Medium:</strong> ${commission.medium}</p>
          <p><strong>Number of Persons:</strong> ${commission.numberOfPersons}</p>
          <p><strong>Deadline:</strong> ${new Date(commission.deadline).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> $${commission.totalPrice}</p>
          <p><strong>Description:</strong> ${commission.description}</p>
        </div>
        
        ${shippingInfo}
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Reference Images:</h3>
          <ul>
            ${imagesList}
          </ul>
        </div>
        
        <p>Please log in to your admin dashboard to manage this commission.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent to artist');
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
};

module.exports = {
  sendCommissionConfirmation,
  sendCommissionNotification
};
