
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  department: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'hardware' | 'software' | 'network' | 'email' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'assigned' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  requester: User;
  assignee?: User;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  resolution?: string;
  attachments?: string[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  author: User;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}
