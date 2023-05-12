# Cloudflare Worker for Email Notifications

## This Cloudflare Worker routes emails and sends notifications about the emails to my backend.

### How to use

Clone this repository.
In variables on settings, set the following environment variables:

    EMAIL_DOMAINS: A comma-separated list of allowed email domains.
    INT_TERMS: A comma-separated list of interesting terms.
    EMAIL_NOTIFICATIONS_ENDPOINT: The URL of the endpoint to send email notifications to.

Deploy the worker to Cloudflare.

## License

This project is licensed under the MIT License.