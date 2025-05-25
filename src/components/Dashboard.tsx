
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Ticket, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalTickets: 42,
    openTickets: 18,
    inProgress: 8,
    resolved: 16,
    myTickets: user?.role === 'user' ? 5 : undefined,
    assignedToMe: user?.role === 'agent' ? 6 : undefined
  };

  const recentTickets = [
    {
      id: 'T-001',
      title: 'Computer not starting',
      status: 'open',
      priority: 'high',
      requester: 'Jane Smith',
      createdAt: '2 hours ago'
    },
    {
      id: 'T-002',
      title: 'Email access issues',
      status: 'in-progress',
      priority: 'medium',
      requester: 'John Doe',
      createdAt: '4 hours ago'
    },
    {
      id: 'T-003',
      title: 'Printer not working',
      status: 'resolved',
      priority: 'low',
      requester: 'Mary Johnson',
      createdAt: '1 day ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">Here's what's happening with your help desk today.</p>
        </div>
        {user?.role === 'user' && (
          <Button onClick={() => navigate('/tickets/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openTickets}</div>
            <p className="text-xs text-muted-foreground">Awaiting attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific stats */}
      {(user?.role === 'user' || user?.role === 'agent') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.role === 'user' && (
            <Card>
              <CardHeader>
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>Tickets you've submitted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.myTickets}</div>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/my-tickets')}>
                  View My Tickets
                </Button>
              </CardContent>
            </Card>
          )}

          {user.role === 'agent' && (
            <Card>
              <CardHeader>
                <CardTitle>Assigned to Me</CardTitle>
                <CardDescription>Tickets requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.assignedToMe}</div>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/assigned-tickets')}>
                  View Assigned Tickets
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>Latest activity in the help desk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{ticket.id}</span>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} priority
                    </span>
                  </div>
                  <h4 className="font-medium mt-1">{ticket.title}</h4>
                  <p className="text-sm text-gray-600">
                    Requested by {ticket.requester} • {ticket.createdAt}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                  View
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={() => navigate('/tickets')}>
              View All Tickets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
