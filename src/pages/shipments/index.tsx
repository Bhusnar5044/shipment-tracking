import PageContent from '@/components/DashboardLayout/PageContent';
import TabTableTemplate from '@/components/TabTableTemplate';
import Button from '@/components/common/Button';
import React from 'react';
import { Link } from 'react-router-dom';

const Shipments: React.FC = () => {
  return (
    <PageContent isPaddingDisabled>
      <TabTableTemplate
        serviceApiKey="shipments"
        defaultTab="all"
        tabType="tab"
        tabs={['all', 'in transit', 'delivered']}
        buttonComp={
          <Button variant="outline">
            <Link to="/dashboard/shipments/new">Create Shipment</Link>
          </Button>
        }
      />
    </PageContent>
  );
};

export default Shipments;
