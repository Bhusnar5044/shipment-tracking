export type Props<T, K extends string> = {
  data: {
    orderId: string;
    transactionId: string;
    original?: T & { [key: string]: string };
  };
  sidePanelKey: string;
  displayKey: K;
};
