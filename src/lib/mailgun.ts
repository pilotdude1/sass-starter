import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY as string
});

/**
 * Send transactional email via Mailgun
 */
export async function sendEmail(to: string, subject: string, text: string) {
	return mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
		from: `noreply@${process.env.MAILGUN_DOMAIN}`,
		to,
		subject,
		text
	});
}
