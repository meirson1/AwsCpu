# AWS CPU Metrics Dashboard

A full-stack application designed to monitor and visualize CPU utilization metrics for AWS EC2 instances. This project demonstrates a clean architecture integrating a robust NestJS backend with a modern React frontend.

## 🚀 Project Overview

The **AWS CPU Metrics Dashboard** allows users to:

- **Search** for specific EC2 instances by IP address.
- **Filter** metrics by time range and resolution (interval).
- **Visualize** CPU usage data on an interactive, responsive chart.

The system is built to be scalable, type-safe, and visually polished, leveraging the latest industry standards.

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js
- **Framework**: [NestJS](https://nestjs.com/) (Modular, scalable server-side framework)
- **Cloud Integration**: AWS SDK v3 (`@aws-sdk/client-ec2`, `@aws-sdk/client-cloudwatch`)
- **Language**: TypeScript

### Frontend

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand) (Lightweight, hook-based state)
- **Visualization**: [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- **Icons**: Lucide React
- **Language**: TypeScript

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **AWS Credentials**: You must have an AWS account with permissions to access EC2 and CloudWatch (`CloudWatchReadOnlyAccess`, `AmazonEC2ReadOnlyAccess`).

### 1. Backend Setup

The backend handles API requests and communicates with AWS services.

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Ensure your local environment has access to AWS credentials. You can set them via the AWS CLI (`aws configure`) or environment variables:
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`
    - `AWS_REGION` (e.g., `us-east-1`)

4.  Start the development server:
    ```bash
    npm run start:dev
    ```
    The server will start on `http://localhost:3000`.

### 2. Frontend Setup

The frontend provides the user interface for interacting with the metrics.

1.  Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or the port shown in your terminal).

---

## 📂 Project Structure

A high-level overview of the codebase organization.

### Backend (`/backend`)

built using the NestJS modular architecture.

- `src/app.module.ts`: Root module handling configuration.
- `src/metrics/`: Core feature module.
  - `metrics.controller.ts`: Handles HTTP requests (e.g., `GET /metrics/cpu`).
  - `metrics.service.ts`: Business logic and AWS SDK integration.
  - `metrics.dto.ts`: Data Transfer Objects for validation.

### Frontend (`/frontend`)

Built with a component-driven structure.

- `src/api/`: API integration layer (fetches data from the backend).
- `src/component/`: Reusable UI components.
  - `MetricsForm/`: The search interface component (Header, Content, Footer).
  - `Chart.tsx`: The data visualization component.
  - `Button.tsx`: Generic button component.
- `src/pages/`: Main application views (`DashboardPage.tsx`).
- `src/store/`: Global state management (`useMetricsStore.ts`).

## 🧩 Key Features

- **Type Safety**: Shared interfaces and strict TypeScript configurations across the stack.
- **Resilient Layout**: The dashboard features a responsive grid layout that robustly aligns heights between form and chart components using Flexbox.
- **Error Handling**: Graceful error management for network requests and invalid usage.

---

_This project is designed for maintainability and scalability, following modern engineering best practices._
