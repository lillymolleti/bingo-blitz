// types/index.ts
export interface Question {
    id: string;
    topic: string;
    text: string;
    options: string[];
    difficulty:string;
  }
  
  export interface User {
    teckziteId: string;
    // Add other user properties as needed
  }