
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import StatsCards from '@/components/StatsCards';
import RoleSpecificStats from '@/components/RoleSpecificStats';
import RecentTickets from '@/components/RecentTickets';

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
      const { data, error } = await (supabase as any)
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
      const { data: allTickets, error } = await (supabase as any)
        .from('tickets')
        .select('status, requester_id, assigned_to');

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      const total = allTickets?.length || 0;
      const open = allTickets?.filter((t: any) => t.status === 'open').length || 0;
      const inProgress = allTickets?.filter((t: any) => t.status === 'in-progress').length || 0;
      const resolved = allTickets?.filter((t: any) => t.status === 'resolved').length || 0;
      const myTickets = allTickets?.filter((t: any) => t.requester_id === profile?.id).length || 0;
      const assignedToMe = allTickets?.filter((t: any) => t.assigned_to === profile?.id).length || 0;

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
      <StatsCards stats={stats} />

      {/* Role-specific stats */}
      {profile && (
        <RoleSpecificStats 
          profile={profile} 
          stats={stats} 
        />
      )}

      {/* Recent Tickets */}
      <RecentTickets tickets={tickets} />
    </div>
  );
};

export default Dashboard;
