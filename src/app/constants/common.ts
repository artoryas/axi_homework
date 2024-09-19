import { Counter } from "../types/common";

export const MIN_PROCESSING_TIME = 2;
export const MAX_PROCESSING_TIME = 5;
export const ONE_SECOND = 1000;

export const COUNTERS_INITIAL_STATE: Counter[] = [
  {
    id: 1,
    name: "Counter 1",
    processingTime: 2,
  },
  {
    id: 2,
    name: "Counter 2",
    processingTime: 2,
  },
  {
    id: 3,
    name: "Counter 3",
    processingTime: 2,
  },
  {
    id: 4,
    name: "Counter 4",
    processingTime: 2,
  },
];
