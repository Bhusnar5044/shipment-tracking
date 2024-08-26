import TabTableTemplate from "@/components/TabTableTemplate";
import React from "react";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import PageContent from "@/components/DashboardLayout/PageContent";

const Shipments: React.FC = () => {
  return (
    <PageContent isPaddingDisabled>
      <TabTableTemplate
        serviceApiKey='shipments'
        defaultTab='all'
        tabType="tab"
        tabs={["all", "in transit", "delivered"]}
        buttonComp={
            <Button variant="outline">
                <Link to="/dashboard/shipments/new">
                Create Shipment
                </Link>
            </Button>
        }
      />
    </PageContent>
  );
};

export default Shipments;
