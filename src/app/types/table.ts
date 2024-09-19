import { Counter } from "./common";

export type TableProps = {
  liveCustomers: number[];
  onAddCustomer: (id: number) => void;
};

export type TableItemProps = Counter & {
  liveCustomers: number[];
  reset: boolean;
  onLiveCustomersChange: (newValue: number[]) => void;
};
