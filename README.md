# Nairobi Go

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies with `npm install`.
3. Configure AWS credentials using the AWS SDK default credential chain and set `AWS_REGION` to a region where Textract is available. The AWS identity needs only `textract:DetectDocumentText`.
4. Start the app with `npm start`, then open `http://127.0.0.1:3000`.

Courier signup sends the front and back ID images to the same-origin `/api/verify-national-id` endpoint. The server checks the JPEG/PNG image signature and size, sends the image bytes to AWS Textract for OCR, and checks for Kenyan National ID text markers. Images are processed in memory and are not written to disk or logged by this app. Use HTTPS when hosting the app for other people.

Phone signup sends a six-digit verification code through Africa's Talking. Set `AFRICASTALKING_USERNAME` and `AFRICASTALKING_API_KEY` in the server environment. SMS uses the sandbox by default; set `AFRICASTALKING_ENVIRONMENT=production` to send live messages, and optionally set `AFRICASTALKING_SENDER_ID` to an approved sender ID. The server keeps verification challenges in memory for five minutes and limits resend and verification attempts. Configure the provider credentials and an approved sender ID before deploying; never place API credentials in frontend code or commit them.

The OCR checks reject images without the expected text markers, but they are not an authenticity check and cannot guarantee that an ID is genuine or belongs to the applicant. Review identity documents through an approved verification process before enabling real courier payouts. Do not put AWS credentials in frontend code or commit them to the repository.

Run the local verification tests with `npm test`.
