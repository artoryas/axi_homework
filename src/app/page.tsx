"use client";

import Table from "@/components/Table/Table";
import styles from "./page.module.scss";
import { useEffect, useRef, useState } from "react";
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
  const [customersInQueue, setCustomersInQueue] = useState<number[]>([]);
  const [initialCustomers, setInitialCustomers] = useState<number>(10);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [lastCustomerNumber, setLastCustomerNumber] = useState(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  /**
   * Set processing time of specific counter
   * @param id - id of counter
   * @param value - new processing time
   */
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
   * Set initial customers number
   * @param value - new value
   */
  const setInitialCustomersNumber = (value: string) => {
    const quantity = Number(value);

    if (isNaN(quantity)) return;

    setInitialCustomers(quantity);
  };

  /**
   * Set new value for customers queue
   * @param newValue - new value
   */
  const handleQueueCustomersChange = (newValue: number[]) => {
    setCustomersInQueue([...newValue]);
  };

  /**
   * Append new customer to queue
   */
  const addCustomerToQueue = () => {
    setLastCustomerNumber(lastCustomerNumber + 1);
    setCustomersInQueue((state) => [...state, lastCustomerNumber + 1]);
  };

  /**
   * Reset all states
   * @returns
   */
  const resetAllState = () =>
    new Promise<void>((resolve) => {
      setCustomersInQueue([]);
      setIsReset(true);
      setLastCustomerNumber(0);

      setTimeout(() => {
        setIsReset(false);
        resolve();
      }, 0);
    });

  /**
   * Validate processing times from user
   */
  const hasInvalidTimes = (): boolean => {
    const hasInvalidTime = counters.some(
      (counter) =>
        counter.processingTime < MIN_PROCESSING_TIME ||
        counter.processingTime > MAX_PROCESSING_TIME
    );

    setHasError(hasInvalidTime);

    return hasInvalidTime;
  };

  /**
   * Handle change of initial states
   * @returns
   */
  const changeInit = async () => {
    await resetAllState();

    if (isEditMode && !hasInvalidTimes()) {
      setIsEditMode(false);

      restartProcess();

      return;
    }

    setIsEditMode(true);
  };

  /**
   * Restart the process with up to date initial configs
   */
  const restartProcess = () => {
    const arrayOfInitialCustomers = Array.from(
      { length: initialCustomers },
      (_, index) => index + 1
    );
    setLastCustomerNumber(initialCustomers);
    setCustomersInQueue(arrayOfInitialCustomers);
  };

  useEffect(() => {
    if (hasError) {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [hasError]);

  return (
    <main className={styles.main}>
      <h1>Bank counter</h1>
      <Table
        customersInQueue={customersInQueue}
        lastCustomerNumber={lastCustomerNumber}
        onAddCustomerToQueue={addCustomerToQueue}
      >
        {counters.map(({ id, name, processingTime }) => (
          <TableItem
            key={id}
            id={id}
            name={name}
            reset={isReset}
            processingTime={processingTime}
            customersInQueue={customersInQueue}
            onQueueCustomersChange={handleQueueCustomersChange}
          />
        ))}
      </Table>
      <InitialState
        counters={counters}
        customers={initialCustomers}
        isDisabled={!isEditMode}
        onInputChange={handleProcessingTimeChange}
        onCustomersNumberChange={setInitialCustomersNumber}
      />
      <button
        className={styles.main__changeSettingsButton}
        onClick={changeInit}
      >
        {isEditMode ? "Apply Changes" : "Change init"}
      </button>
      {hasError && (
        <p ref={errorRef} className={styles.main__error}>
          Please enter processing time values between 2 and 5 (seconds)
        </p>
      )}
    </main>
  );
}
