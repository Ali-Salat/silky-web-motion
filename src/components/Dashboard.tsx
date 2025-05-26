
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Ticket, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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

const Dashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgress: 0,
    resolved: 0,
    myTickets: 0,
    assignedToMe: 0
  });

  useEffect(() => {
    if (profile) {
      fetchTickets();
      fetchStats();
    }
  }, [profile]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          id,
          title,
          status,
          priority,
          created_at,
          profiles:requester_id (name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching tickets:', error);
        return;
      }

      setTickets(data || []);
    } catch (error) {
      console.error('Error in fetchTickets:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: allTickets, error } = await supabase
        .from('tickets')
        .select('status, requester_id, assigned_to');

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      const total = allTickets?.length || 0;
      const open = allTickets?.filter(t => t.status === 'open').length || 0;
      const inProgress = allTickets?.filter(t => t.status === 'in-progress').length || 0;
      const resolved = allTickets?.filter(t => t.status === 'resolved').length || 0;
      const myTickets = allTickets?.filter(t => t.requester_id === profile?.id).length || 0;
      const assignedToMe = allTickets?.filter(t => t.assigned_to === profile?.id).length || 0;

      setStats({
        totalTickets: total,
        openTickets: open,
        inProgress,
        resolved,
        myTickets,
        assignedToMe
      });
    } catch (error) {
      console.error('Error in fetchStats:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile?.name}
          </h1>
          <p className="text-gray-600">Here's what's happening with your help desk today.</p>
        </div>
        {profile?.role === 'user' && (
          <Button onClick={() => navigate('/new-ticket')}>
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
      {(profile?.role === 'user' || profile?.role === 'agent') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.role === 'user' && (
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

          {profile.role === 'agent' && (
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
    </div>
  );
};

export default Dashboard;
