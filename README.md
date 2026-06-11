# Advanced Multiple (AMI) Frontend

This is the frontend application for Advanced Multiple (AMI), a modern digital media and content production company. Built with Next.js 14, TypeScript, and Tailwind CSS, it integrates with Strapi as a headless CMS and supports multi-language content.

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Multi-language support (English, German, Czech)
- Integration with Strapi CMS for content management
- Markdown rendering with react-markdown
- Headless UI components
- Blog functionality
- Service catalog
- Team and contact pages
- Event management

## Getting Started

### Prerequisites

- Node.js and npm/yarn/pnpm
- Strapi backend server running

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Copy the environment variables file:

```bash
cp .env.example .env
```

3. Update the environment variables in `.env`:
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: Your Strapi API token
- `NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN`: Token for form submissions
- `NEXT_PUBLIC_STRAPI_API_URL`: URL of your Strapi server (default: `http://localhost:1337`)
- `NEXT_PUBLIC_PAGE_LIMIT`: Pagination limit

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build & Run Production

```bash
npm run build
npm run start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Author

**Abdullah Siddique**
- Website: [https://www.abdullahsiddique.co.uk/](https://www.abdullahsiddique.co.uk/)
- LinkedIn: [https://www.linkedin.com/in/mr-abdullah-siddique/](https://www.linkedin.com/in/mr-abdullah-siddique/)
- Email: abdullahsiddique773@gmail.com
