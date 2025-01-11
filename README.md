# Gibwork - Task Management Platform on Solana

A decentralized platform for creating and managing tasks using Solana blockchain technology.

## Project Structure

```
gibwork/
├── src/
│   ├── app/                         # Next.js application pages
│   │   ├── createTask/         
│   │   │   └── page.tsx             # Task creation form and logic
│   │   ├── listedTask/              
│   │   │   └── page.tsx             # Display of all listed tasks
│   │   ├── layout.tsx               
│   ├── components/ 
|   |   ├── ui/                      # All shadcn components 
│   │   ├── Navbar.tsx               # Navigation bar component
|   |   ├── CreateTaskForm.tsx       # Tasks are created using this component 
│   │   ├── TaskList.tsx             # All tasks display component
│   │   └── AppWalletProvider.tsx    # Solana wallet integration
│   ├── lib/                         
│   |   ├── api.ts                   # API interaction functions
|   |   └── utils.ts
|   |       
|   └── types/
|       └──types.ts                  # Type definitions for the application (Interface)
|
├── public/                          # Static files and assets
├── next.config.js                   # Next.js configuration
├── package.json                     # Project dependencies and scripts
└── tailwind.config.js               # Tailwind CSS configuration
```

## Key Features

- Task Creation and Management
- Solana Wallet Integration
- Task Listing and Browsing
- Responsive Design

## Important Files and Their Functions

### Core Components

1. `src/app/createTask/page.tsx`
   - Handles task creation form
   - Manages form validation and submission
   - Integrates with Solana wallet for transactions

2. `src/app/listedTask/page.tsx`
   - Displays all listed tasks
   - Implements task filtering and sorting
   - Manages task data fetching and display

3. `src/components/Navbar.tsx`
   - Main navigation component
   - Wallet connection button
   - Navigation links
   - Responsive design implementation

4. `src/components/WalletProvider.tsx`
   - Solana wallet adapter configuration
   - Wallet connection state management
   - Error handling for wallet operations

### API and Utils

1. `src/utils/api.ts`
   - API endpoint definitions
   - Task creation function (`createTask`)
   - Data fetching utilities
   - Error handling for API calls

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gibwork.git
cd gibwork
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in required values:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Environment Variables

Required environment variables:
```
NEXT_PUBLIC_API_URL=https://api2.gib.work
```

## Technology Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js
- Solana Wallet Adapter

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Test wallet integration thoroughly
- Follow the existing component structure
- Comment complex logic
- Keep components modular and reusable

## License

This project is open source and available under the [MIT License](LICENSE).
