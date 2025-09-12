# SentioPulse | Web Application

This repository contains the source code for the SentioPulse web application. This is the primary, user-facing platform where users can view market sentiment data, manage their accounts, and configure alerts.

-----

### Core Purpose

The purpose of this application is to provide a clean, fast, and intuitive interface for the sentiment data produced by our backend pipeline. It consumes a private API to deliver insights to our users.

  * **User Dashboard:** Displays a real-time feed of classified sentiment signals with robust filtering and search capabilities.
  * **Authentication & Subscriptions:** Handles user sign-up, login, profile management, and premium subscriptions via Stripe.
  * **Custom Alerts:** Allows premium users to create and manage highly specific, real-time alert criteria for delivery to Discord.
  * **Reporting:** Renders automated daily and weekly summary reports of the most significant market chatter.

-----

### Tech Stack

This application is built with a modern, full-stack TypeScript approach.

  * **Framework:** **Next.js 15** (App Router)
  * **Language:** **TypeScript**
  * **Styling:** **Tailwind CSS** with **shadcn/ui** for components
  * **Authentication:** **Arctic & Rainbowkit Wallet**
  * **Data Fetching:** Next.js Server Actions
  * **Hosting:** **Vercel**

Our backend data pipeline, which is managed in separate repositories, processes the raw data and serves it to this application via a private API backed by a PostgreSQL database.

-----

### Getting Started (Local Development)

To run this project locally, you'll need Node.js (v18+) and pnpm installed.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-org/sentiopulse-webapp.git
    cd sentiopulse-webapp
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file by copying the example and fill in the required keys for NextAuth, Stripe, and the internal API endpoint.

    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`.

-----

### Links

  * **Website & Newsletter:** [sentiopulse.com](https://www.sentiopulse.com)
  * **Twitter:** [@SentioPulse](https://twitter.com/SentioPulse)

-----

© 2025 SentioPulse. All Rights Reserved.
