
import React from 'react';
import Layout from '@/components/Layout';
import NewTicketForm from '@/components/NewTicketForm';

const NewTicketPage = () => {
  return (
    <Layout title="Create New Ticket">
      <NewTicketForm />
    </Layout>
  );
};

export default NewTicketPage;
