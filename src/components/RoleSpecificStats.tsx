
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RoleSpecificStatsProps {
  profile: {
    role: 'admin' | 'agent' | 'user';
  };
  stats: {
    myTickets: number;
    assignedToMe: number;
  };
}

const RoleSpecificStats = ({ profile, stats }: RoleSpecificStatsProps) => {
  const navigate = useNavigate();

  if (profile.role !== 'user' && profile.role !== 'agent') {
    return null;
  }

  return (
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
  );
};

export default RoleSpecificStats;
