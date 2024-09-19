import { Counter } from "./common";

export type InitialStateProps = {
  counters: Counter[];
  customers: number;
  isDisabled: boolean;
  onInputChange: (id: number, value: string) => void;
  onCustomersNumberChange: (value: string) => void;
};
