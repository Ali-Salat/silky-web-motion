
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getStatusColor, getPriorityColor, formatDate } from '@/utils/ticketUtils';

interface TicketData {
  id: string;
  title: string;
  status: string;
  priority: string;
  created_at: string;
  profiles: {
    name: string;
  };
}

interface RecentTicketsProps {
  tickets: TicketData[];
}

const RecentTickets = ({ tickets }: RecentTicketsProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tickets</CardTitle>
        <CardDescription>Latest activity in the help desk</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">#{ticket.id.slice(0, 8)}</span>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority} priority
                  </span>
                </div>
                <h4 className="font-medium mt-1">{ticket.title}</h4>
                <p className="text-sm text-gray-600">
                  Requested by {ticket.profiles?.name} • {formatDate(ticket.created_at)}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                View
              </Button>
            </div>
          ))}
          {tickets.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tickets found</p>
          )}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={() => navigate('/tickets')}>
            View All Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTickets;
