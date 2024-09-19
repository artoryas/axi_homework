"use client";

import Table from "@/components/Table/Table";
import styles from "./page.module.scss";
import { useState } from "react";
import { Counter } from "./types/common";
import InitialState from "@/components/InitialState/InitialState";
import {
  COUNTERS_INITIAL_STATE,
  MAX_PROCESSING_TIME,
  MIN_PROCESSING_TIME,
} from "./constants/common";
import TableItem from "@/components/TableItem/TableItem";

export default function Home() {
  const [counters, setCounters] = useState<Counter[]>(COUNTERS_INITIAL_STATE);
  const [liveCustomers, setLiveCustomers] = useState<number[]>([]);
  const [initialCustomers, setInitialCustomers] = useState<number>(10);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleProcessingTimeChange = (id: number, value: string) => {
    const processingTime = Number(value);

    if (isNaN(processingTime)) return;

    setCounters((state) =>
      state.map((counter) =>
        counter.id === id ? { ...counter, processingTime } : counter
      )
    );
  };

  /**
   * Event listener when the user finishes typing the processing time value
   */
  const handleInputBlur = (id: number) => {
    const counter = counters.find((item) => item.id === id);

    if (!counter) return;

    /**
     * If the value is lower than minimal processing time then we set the minimal value
     */
    if (counter.processingTime < MIN_PROCESSING_TIME) {
      setCounters((state) =>
        state.map((counter) =>
          counter.id === id
            ? { ...counter, processingTime: MIN_PROCESSING_TIME }
            : counter
        )
      );
    }

    /**
     * If the value is higher than maximal processing time then we set the maximal value
     */
    if (counter.processingTime > MAX_PROCESSING_TIME) {
      setCounters((state) =>
        state.map((counter) =>
          counter.id === id
            ? { ...counter, processingTime: MAX_PROCESSING_TIME }
            : counter
        )
      );
    }
  };

  const handleInitialCustomersChange = (value: string) => {
    const quantity = Number(value);

    if (isNaN(quantity)) return;

    setInitialCustomers(quantity);
  };

  const handleLiveCustomersChange = (newValue: number[]) => {
    setLiveCustomers([...newValue]);
  };

  const addLiveCustomer = (id: number) => {
    setLiveCustomers((state) => [...state, id]);
  };

  const changeInit = () => {
    setLiveCustomers([]);

    if (isEditMode) {
      setIsEditMode(false);

      startProcess();

      return;
    }

    setIsEditMode(true);
  };

  const startProcess = () => {
    const arrayOfIds = Array.from(
      { length: initialCustomers },
      (_, index) => index + 1
    );
    setLiveCustomers(arrayOfIds);
  };

  return (
    <main className={styles.main}>
      <h1>Bank counter</h1>
      <Table liveCustomers={liveCustomers} onAddCustomer={addLiveCustomer}>
        {counters.map(({ id, name, processingTime }) => (
          <TableItem
            key={id}
            id={id}
            name={name}
            reset={isEditMode}
            processingTime={processingTime}
            liveCustomers={liveCustomers}
            onLiveCustomersChange={handleLiveCustomersChange}
          />
        ))}
      </Table>
      <InitialState
        counters={counters}
        customers={initialCustomers}
        isDisabled={!isEditMode}
        onInputChange={handleProcessingTimeChange}
        onInputBlur={handleInputBlur}
        onCustomersNumberChange={handleInitialCustomersChange}
      />
      <button onClick={changeInit}>Change init</button>
    </main>
  );
}
