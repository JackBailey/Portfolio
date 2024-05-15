import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";
import dotenv from "dotenv";
import crypto from "crypto";
import { db, Submission } from "astro:db";
import { useTurnstile } from "../../../_utils";
dotenv.config();

const emailEnabled = process.env.RESEND_RECIPIENT && process.env.RESEND_API_KEY;
const gotifyEnabled = process.env.GOTIFY_URL && process.env.GOTIFY_TOKEN;

let resend;
if (emailEnabled) {
    resend = new Resend(process.env.RESEND_API_KEY);
}

export const prerender = false;

const verifyTurnstile = async ({token, ip}) => {
    const formData = new FormData();
    formData.append("secret", process.env.CF_TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);

    try {
        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
        });
    
        const outcome = await result.json();

        if (!outcome.success) console.log(outcome['error-codes']);
    
        return outcome.success;
    } catch (error) {
        console.error(error);
        return false;
    }
}

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

export const POST = async ({ clientAddress, request, redirect, site }) => {
    const data = await request.formData();
    const name = data.get('name');
    const userEmail = data.get('email');
    const userMessage = data.get('message');
    const turnstileResponse = data.get('cf-turnstile-response');
    const searchParams = new URLSearchParams();
    
    if (!name || !userEmail || !userMessage || (!turnstileResponse && useTurnstile)) {
        searchParams.set("title", 400);
        searchParams.set("message", "Missing required fields");
        return redirect("/contact/error?" + searchParams.toString());
    };

    if (useTurnstile) {
        const turnstileSuccess = await verifyTurnstile({token: turnstileResponse, ip: clientAddress});
    
        if (!turnstileSuccess) {
            searchParams.set("title", 400);
            searchParams.set("message", "Failed to verify captcha");
            return redirect("/contact/error?" + searchParams.toString());
        }
    }
    
    let checkEmailResponse = await checkSpamRating(userEmail);

    if (checkEmailResponse[1]) {
        console.log(checkEmailResponse[1]);
        searchParams.set("title", 500);
        searchParams.set("message", "Error checking email, try again later");
        return redirect("/contact/error?" + searchParams.toString());
    }

    if (checkEmailResponse[0].confidence > 95) {
        console.log(`${clientAddress} | tried to send an email from ${userEmail} to ${process.env.RESEND_RECIPIENT} but they were blocked with ${checkEmailResponse[0].frequency} Spam results and a ${checkEmailResponse[0].confidence + "%"} confidence level.`);
        return redirect("/contact/success");   
    }

    const submission = {
        id: crypto.randomBytes(16).toString("hex"),
        name: name,
        email: userEmail,
        message: userMessage,
        createdAt: new Date(),
        ipAddress: clientAddress,
        userAgent: request.headers.get("user-agent") || null
    };
    
    await db.insert(Submission).values(submission);

    const submissionURL = `${site.href}contact/submission/${submission.id}`;

    if (gotifyEnabled) {
        const gotifyResponse = await fetch(process.env.GOTIFY_URL + "/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Gotify-Key": process.env.GOTIFY_TOKEN
            },
            body: JSON.stringify({
                title: "New Submission",
                message: `Visit ${submissionURL} to view it`,
                priority: 5,
                extras: {
                    "client::notification": {
                        click: { url: submissionURL },
                    },
                }
            })
        });

        console.log(`${site.href}contact/submission/${submission.id}`);

        if (!gotifyResponse.ok) {
            console.error(`Failed to send gotify message: ${gotifyResponse.status} ${gotifyResponse.statusText}`);
        }

        console.log(`${clientAddress} | has created a new submission`);
    } else if (emailEnabled) {
        let emailResponse = await resend.emails.send({
            from: `Jack Bailey <${process.env.RESEND_FROM_ADDRESS}>`,
            to: process.env.RESEND_RECIPIENT,
            subject: `Contact form submission from ${name} <${userEmail}>`,
            html: `Someone has used your email form. <a href="${site.href}contact/submission/${submission.id}}">View the submission</a>`
        });

        if (emailResponse.error) {
            console.log(emailResponse.error);
            searchParams.set("title", 500);
            searchParams.set("message", "Internal Server Error, try again later");
            return redirect("/contact/error?" + searchParams.toString());
        };
    }

    console.log(`${clientAddress} | has created a new submission (${userEmail} => ${process.env.RESEND_RECIPIENT})`);

    return redirect(`/contact/success?id=${submission.id}`);
};
