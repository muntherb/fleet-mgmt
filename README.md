# Fleet Management System

A comprehensive fleet management system built with modern web technologies to manage vehicles, maintenance records, location statuses, and analytics.

## Features

- **Vehicle Management**: Add, update, and view vehicle details such as model, type, status, and more.
- **Maintenance Tracking**: Keep track of maintenance history, including costs, notes, and statuses.
- **Location Monitoring**: Monitor vehicle locations, speeds, and headings in real-time.
- **Analytics Dashboard**: Interactive charts to visualize fleet performance over time.
- **Drag-and-Drop Table Management With Sort And Filter**: Reorder table rows with drag-and-drop functionality, sorting and filtering.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Features to be added:

- **Deleting**: Option to delete vehicles and data from other lists.
- **Editing**: Option to edit vehicles and data from other lists.
- **Bulk Upload**: Option to bulk upload data, can be from a CSV file.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js (Uses NodeJS and Express) API routes, MongoDB, Mongoose
- **State Management**: Zustand (Including middleware)
- **Charts**: Recharts
- **Testing**: Jest, React Testing Library
- **Containerization**: Docker, Docker Compose

---

## Prerequisites

- Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.
- Ensure Node.js and npm are installed for local development.

---

## Development

To set up the development environment:

1. **Create a Docker network**:
   ```bash
   docker network create my_network
   ```

2. **Build the development environment**:
   ```bash
   docker compose -f compose.dev.yaml build
   ```

3. **Start the development server**:
   ```bash
   docker compose -f compose.dev.yaml up
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can start editing the code by modifying files in the `src` directory. The application supports hot reloading, so changes will reflect immediately.

---

## Production

To deploy the application in a production environment:

1. **Create a Docker network**:
   ```bash
   docker network create my_network
   ```

2. **Build the production environment**:
   ```bash
   docker compose -f compose.prod.yaml build
   ```

3. **Start the production server in detached mode**:
   ```bash
   docker compose -f compose.prod.yaml up -d
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Project Structure

- **`src/components`**: Contains reusable React components such as tables, forms, and charts.
- **`src/store`**: Zustand-based state management slices for vehicles, maintenance, and location statuses.
- **`src/models`**: Mongoose models for MongoDB collections.
- **`src/app/api`**: API routes for handling backend logic.
- **`src/scripts`**: Utility scripts for database operations.
- **`src/types`**: Type definitions and schemas using Zod.

---

## Testing

The project includes unit tests for critical components and state management:

1. **Run tests**:
   ```bash
   npm test
   ```

2. **Test coverage**:
   ```bash
   npm run test:coverage
   ```

---

## API Endpoints

### Vehicles
- **GET** `/api/vehicles`: Fetch all vehicles.
- **GET** `/api/vehicles/${id}`: Fetch vehicle by ID.
- **POST** `/api/vehicles`: Add a new vehicle.

### Maintenance
- **GET** `/api/maintenance/history`: Fetch maintenance history.
- **GET** `/api/maintenance/history?id=2`: Fetch maintenance history by vehicle ID.
- **POST** `/api/maintenance/add`: Add a maintenance record.
