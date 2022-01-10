<template>
	<div class="tos">
		<div class="content">
			<h1>Terms of Service</h1>
			<p>Please read the terms of service below.</p>
			<pre>
Client: You - the person hiring Jack Bailey
Source: The files Jack Bailey has used to complete the work.

Index:
1.	Work terms
2.	Invoicing
3.	Payment
4.	Source
5.	Post Work
6.	Refunds
7.	Requirements
8.	Deployment

Terms:

1.	Work Terms
Jack Bailey can be hired one of two ways.
Casual - work is discussed with an estimated deadline and a price is negotiated, then work is completed by Jack Bailey, an invoice is sent, payment is received, and the source is given to the client.
Contracted – both parties sign a service agreement from Jack Bailey – work is completed per invoice, which is upon request by Jack Bailey. Source will not be provided prior to payment but previews (including but not limited to a local tunnel) will be provided prior to payment. This is based on an hourly rate set by Jack Bailey.

2.	Invoicing
Jack Bailey will send an invoice to either email or preferred online messaging service on completion of work for casual work or when appropriate for contracted work. This is to be paid within 5 days (120 hours) after sending. Failure to send payment (under section 3) will result in work being terminated and the source not being sent unless discussed otherwise.

3.	Payment

Payment can be completed as either

a.	Transfer into a UK bank
b.	Stripe Invoice
c.	Cryptocurrency transaction

Additional payment methods can be used if discussed beforehand. Invoice cost is excluding fees and are to be paid by the client when applicable.

4.	Source

Source code – such as a VueJS Project, generic static site files etc. are given to the client in a git repository such as via GitHub, or in a .zip file. 

5.	Post work

Payment covers work that has been done and entitles you to no additional work from Jack Bailey. You can request more work to be done by Jack Bailey, but he is under no obligation to do so.
Exceptions can be made if the work completed was not of satisfactory quality.

6.	Refunds

Refunds are not able to be given if the work requirements are met and to satisfactory quality.

7.	Requirements

All requirements are to be sent to Jack Bailey in a precise manor to ensure work requested is as needed. Changes to these may increase prices on completion.  The type of work - frontend, backend or both needs to be discussed before any work is completed.

8.	Deployment

Jack Bailey will not deploy the work completed for you. This includes transferring onto an FTP server, website, or other host. Distribution files will be sent as well as the source files, but the client must deploy them themselves.</pre
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tos {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.content {
		width: max-content;
		max-width: 50%;
		text-align: center;
		background: var(--background);
		color: var(--foreground);
		padding: 20px;
		border-radius: 10px;
		box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.5);
		pre {
			width: 100%;
			text-align: left;
			box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.5);
			padding: 10px;
			border-radius: 10px;
			box-sizing: border-box;
			margin: 0;
			font: inherit;
			max-height: 400px;
			overflow-y: scroll;
			word-break: break-all;
			white-space: pre-wrap;
			width: 100%;
		}
	}
}
@media screen and (max-width: 800px) {
	.tos {
		.content {
			max-width: 100%;
			pre {
				font-size: 14px;
			}
		}
	}
}
</style>
