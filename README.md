# Milky Farm Management System

<p align="center">
  <img src="https://res.cloudinary.com/private-school/image/upload/v1725173490/milky-farm/milky-farm.png" alt="Milky Farm Logo" width='150'>
</p>

## Overview

Milky Farm Management System is a comprehensive solution for managing cow farms. Built with React.js and Express.js, it offers a user-friendly interface for administrators and moderators to efficiently manage various aspects of farm operations.

## Features

- **User Management**: Admins can create and manage user accounts.
- **Cow Management**: Track and manage individual cow data.
- **Milk Production Tracking**: Record and analyze milk production data.
- **Medical Checkups**: Log medical checkups for cows.
- **Birth Records**: Keep track of cow births on the farm.
- **Dashboard**: View key statistics and insights about milk production, births, and overall cow health.

## Technology Stack

- **Frontend**: React.js with Chakra UI
- **Backend**: Express.js
- **Database**: JSON file storage (for users, cows, milk production, medical checkups, births)

## Pages

1. **Dashboard**: Displays stats about milk production, births, and cows.
2. **Cow Management**: Manage individual cow data.
3. **Milk Production Management**: Track and analyze milk production.
4. **Medical Checkups**: Record medical examinations.
5. **Birth Management**: Log and monitor cow births.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ZakaryaMeddahi/milky-farm.git
   cd milky-farm
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both `client` and `server` folders.
   - Modify the `.env` files with your specific configurations.

3. Install dependencies:
   ```
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

4. Start the development servers:
   ```
   # Start the client (from the client folder)
   npm run dev

   # Start the server (from the server folder)
   npm run start:dev
   ```

5. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000` (or the port specified in your server `.env`)

## Default Admin Account

Use these credentials to log in as an admin:
- Email: admin@gmail.com
- Password: admin

## Usage

- **Admin**: Can manage users, create moderator accounts, and access all system features.
- **Moderator**: Can manage cows, milk production records, medical checkups, and births.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Happy farming with Milky Farm Management System! 🥛
