# Auto Login

System for automatic login to a quickfile website using a JWT token.

## Why?

The quickfile api provides a url that can be used to login to a client's quickfile page without the need for a password. However, the link provided does not last very long and needs a way of being refreshed. As such this service is used to provide a way of refreshing the link. A jwt containing the client ID is given to the service which allows the service to use this to generate a new link.

## Environment Variables

Please see the [`.env.example`](.env.example) file for the required environment variables.

## Getting Started

Add the required environment variables to a `.env` file in the root of the project.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The service is currently hosted on vercel at https://quickfile-auto-login.vercel.app/. Changes to the main branch will automatically deploy the service.
