import { Counter } from "./common";

export type TableProps = {
  customersInQueue: number[];
  lastCustomerNumber: number;
  onAddCustomerToQueue: () => void;
};

export type TableItemProps = Counter & {
  customersInQueue: number[];
  reset: boolean;
  onQueueCustomersChange: (newValue: number[]) => void;
};
