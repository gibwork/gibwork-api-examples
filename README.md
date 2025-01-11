# Gibwork - Task Management Platform on Solana

A decentralized platform for creating and managing tasks using Solana blockchain technology.

## Project Structure

```
gibwork/
├── src/
│   ├── app/                         # Next.js application pages
│   │   ├── createTask/         
│   │   │   └── page.tsx            # Task creation form and logic
│   │   ├── listedTask/              
│   │   │   └── page.tsx            # Display of all listed tasks
│   │   └── layout.tsx               
│   ├── components/ 
│   │   ├── ui/                     # All shadcn components 
│   │   ├── Navbar.tsx              # Navigation bar component
│   │   ├── CreateTaskForm.tsx      # Tasks are created using this component 
│   │   ├── TaskList.tsx            # All tasks display component
│   │   └── AppWalletProvider.tsx   # Solana wallet integration
│   ├── lib/                         
│   │   ├── api.ts                  # API interaction functions
│   │   └── utils.ts
│   └── types/
│       └── types.ts                # Type definitions for the application (Interface)
├── public/                         # Static files and assets
├── next.config.js                 # Next.js configuration
├── package.json                   # Project dependencies and scripts
└── tailwind.config.js            # Tailwind CSS configuration
```

## Key Features

- Task Creation and Management
- Solana Wallet Integration
- Task Listing and Browsing
- Responsive Design

## Important Files and Their Functions

### Core Components

1. `src/components/CreateTaskForm.tsx`
   - Handles task creation form
   - Manages form validation and submission
   - Integrates with Solana wallet for transactions

2. `src/components/listedTask/TaskList.tsx`
   - Displays all listed tasks
   - Implements task filtering and sorting
   - Manages task data fetching and display

3. `src/components/Navbar.tsx`
   - Main navigation component
   - Wallet connection button
   - Navigation links
   - Responsive design implementation

4. `src/components/AppWalletProvider.tsx`
   - Solana wallet adapter configuration
   - Wallet connection state management
   - Error handling for wallet operations

5. `src/lib/api.ts`
   - GET method created for fetching tasks
   - POST method created for creating new tasks

6. `src/types/types.ts`
   - Type definitions for the application (Interface)

### API and Utils

1. `src/lib/api.ts`
   - API endpoint definitions

     a. Task Creation
     ```typescript
     const url = "https://api2.gib.work/tasks/public/transaction";
     ```
     
     b. Task Listing
     ```typescript
     const url = `https://api2.gib.work/explore?page=${page}&limit=${limit}`;
     ```

   - Task creation function (`createTask`)
     ```typescript
     export async function createTask(taskData: {
       title: string;
       content: string;
       requirements: string;
       tags: string[];
       payer: string;
       token: {
         mintAddress: string;
         amount: string;
       };
     }) {
       const url = "https://api2.gib.work/tasks/public/transaction";
       const options = {
         method: "POST",
         headers: { accept: "application/json", "content-type": "application/json" },
         body: JSON.stringify({
           token: {
             mintAddress: taskData.token.mintAddress,
             amount: parseInt(taskData.token.amount, 10),
           },
           title: taskData.title,
           content: taskData.content,
           requirements: taskData.requirements,
           tags: taskData.tags,
           payer: taskData.payer,
         }),
       };
       try {
         const response = await fetch(url, options)
           .then((res) => res.json())
           .then((json) => {
             console.log(json);
             window.open(`https://app.gib.work/tasks/${json.taskId}`, "_blank");
           })
           .catch((err) => console.error(err));
         alert("Task created successfully");
       } catch (error) {
         console.error("Sending request failed, Error:", error);
       }
     }
     ```

   - Data fetching utilities
     ```typescript
     export async function fetchTasks(
       page: number = 1,
       limit: number = 15
     ): Promise<PaginatedResponse> {
       const url = `https://api2.gib.work/explore?page=${page}&limit=${limit}`;
       const options = { method: "GET", headers: { accept: "application/json" } };

       try {
         const response = await fetch(url, options);
         const data = await response.json();
         return data;
       } catch (error) {
         console.error("Error fetching tasks:", error);
         return {
           results: [],
           lastPage: 1,
           page: 1,
           limit: 15,
           total: 0,
         };
       }
     }
     ```

## Setup and Installation

1. Clone the repository:
    
   With HTTPS endpoint:
   ```bash
   git clone https://github.com/dipansrimany2006/gibwork-api-examples.git
   cd gibwork
   ```

   With SSH key:
   ```bash
   git clone git@github.com:dipansrimany2006/gibwork-api-examples.git
   cd gibwork
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Technology Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js
- Solana Wallet Adapter

## Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Test wallet integration thoroughly
- Follow the existing component structure
- Comment complex logic
- Keep components modular and reusable