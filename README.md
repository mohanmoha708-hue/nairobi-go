# Nairobi Go

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies with `npm install`.
3. Configure AWS credentials using the AWS SDK default credential chain and set `AWS_REGION` to a region where Textract is available. The AWS identity needs only `textract:DetectDocumentText`.
4. Start the app with `npm start`, then open `http://127.0.0.1:3000`.

Courier signup sends the front and back ID images to the same-origin `/api/verify-national-id` endpoint. The server checks the JPEG/PNG image signature and size, sends the image bytes to AWS Textract for OCR, and checks for Kenyan National ID text markers. Images are processed in memory and are not written to disk or logged by this app. Use HTTPS when hosting the app for other people.

The OCR checks reject images without the expected text markers, but they are not an authenticity check and cannot guarantee that an ID is genuine or belongs to the applicant. Review identity documents through an approved verification process before enabling real courier payouts. Do not put AWS credentials in frontend code or commit them to the repository.

Run the local verification tests with `npm test`.
