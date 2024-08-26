/* eslint-disable @typescript-eslint/no-explicit-any */
import ShipmentContent from './shipementContent';

// TODO: Remove 'any' type once all list types are fully integrated and clarified
const SidePanelContent = (key: string, data: any) => {
  switch (key) {
    case 'shipment_content':
      return <ShipmentContent sidePanelData={data} sidePanelKey={key} />;
    default:
      return <div>Nothing is here</div>;
  }
};

export default SidePanelContent;
