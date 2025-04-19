export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Quantum Computing Basics",
    lastMessage: "Can you explain quantum entanglement?",
    timestamp: "2025-04-19T08:30:00Z",
    messages: [
      {
        id: "m1",
        content: "What is quantum computing?",
        sender: "user",
        timestamp: "2025-04-19T08:25:00Z",
      },
      {
        id: "m2",
        content:
          "Quantum computing is a type of computation that harnesses the collective properties of quantum states to perform calculations...",
        sender: "assistant",
        timestamp: "2025-04-19T08:26:00Z",
      },
      {
        id: "m3",
        content: "Can you explain quantum entanglement?",
        sender: "user",
        timestamp: "2025-04-19T08:30:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "History Exam Prep",
    lastMessage: "Let's review World War II causes",
    timestamp: "2025-04-19T07:15:00Z",
    messages: [
      {
        id: "m4",
        content: "Help me prepare for my history exam",
        sender: "user",
        timestamp: "2025-04-19T07:10:00Z",
      },
      {
        id: "m5",
        content: "I'll help you prepare. What period are you studying?",
        sender: "assistant",
        timestamp: "2025-04-19T07:12:00Z",
      },
      {
        id: "m6",
        content: "Let's review World War II causes",
        sender: "user",
        timestamp: "2025-04-19T07:15:00Z",
      },
    ],
  },
];
