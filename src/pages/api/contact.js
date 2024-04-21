import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const prerender = false;

const checkSpamRating = async (email) => {
    let params = new URLSearchParams();
	params.append("email", email);
	params.append("json", "true");
	try {
		const response = await fetch(`https://api.stopforumspam.org/api?${params.toString()}`);
		const data = await response.json();

		if (!data.success) {
			if (data.email.error) {
				throw new Error(`Error checking email ${email} with stopforumspam. Error: ${data.email.error}`);
			}
			throw new Error(`Error checking email ${email} with stopforumspam. Response: ${data}`);
		} else {
			return [data.email, null];
		}
	} catch (error) {
		return [null, error.message];
	}
};

export const POST = async ({ clientAddress, request, redirect }) => {
    const data = await request.formData();
    const name = data.get('name');
    const userEmail = data.get('email');
    const userMessage = data.get('message');
    const searchParams = new URLSearchParams();

    if (!name || !userEmail || !userMessage) {
        searchParams.set("title", 400);
        searchParams.set("message", "Missing required fields");
        return redirect("/contact/error?" + searchParams.toString());
    };

    let message = "<p>" + sanitizeHtml(userMessage) + "</p>";

    let checkEmailResponse = await checkSpamRating(userEmail);

    if (checkEmailResponse[1]) {
        console.log(checkEmailResponse[1]);
        searchParams.set("title", 500);
        searchParams.set("message", "Error checking email, try again later");
        return redirect("/contact/error?" + searchParams.toString());
    }

    message += `\n<hr>\n<a href="https://www.stopforumspam.com/search?q=${encodeURI(userEmail)}">Spam results</a>: ${checkEmailResponse[0].frequency}${checkEmailResponse[0].confidence ? "<br>Confidence: " + checkEmailResponse[0].confidence + "%" : ""}`;

    let emailResponse = await resend.emails.send({
        from: `Jack Bailey <${process.env.RESEND_FROM_ADDRESS}>`,
        to: process.env.RESEND_RECIPIENT,
        reply_to: userEmail,
        subject: `Contact form submission from ${name} <${userEmail}>`,
        html: message
    });
    
    console.log(`${clientAddress} | has sent an email from ${userEmail} to ${process.env.RESEND_RECIPIENT}`);

    if (emailResponse.error) {
        console.log(emailResponse.error);
        searchParams.set("title", 500);
        searchParams.set("message", "Internal Server Error, try again later");
        return redirect("/contact/error?" + searchParams.toString());
    };


    return redirect("/contact/success");
};
