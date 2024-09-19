"use client";

import { ONE_SECOND } from "@/app/constants/common";
import { TableItemProps } from "@/app/types/table";
import { useEffect, useRef, useState } from "react";

export default function TableItem({
  id,
  name,
  customersInQueue,
  reset,
  onQueueCustomersChange,
  processingTime,
}: TableItemProps) {
  const [currentCustomer, setCurrentCustomer] = useState<number | null>(null);
  const [processedCustomers, setProcessedCustomers] = useState<number[]>([]);
  const isProcessing = useRef(false);
  const timeout = useRef<NodeJS.Timeout>();

  /**
   * Serve current user with given processing time
   */
  const processCurrentUser = () => {
    if (!currentCustomer) return;

    isProcessing.current = true;
    timeout.current = setTimeout(() => {
      setProcessedCustomers((state) => [...state, currentCustomer]);
      setCurrentCustomer(null);
      isProcessing.current = false;
    }, processingTime * ONE_SECOND);
  };

  /**
   * Get new customer from queue and update queue list
   */
  const obtainNewCustomer = () => {
    if (customersInQueue.length === 0) return;
    const nextCustomer = customersInQueue.shift() as number;
    setCurrentCustomer(nextCustomer);
    onQueueCustomersChange(customersInQueue);
  };

  useEffect(() => {
    if (currentCustomer && !isProcessing.current) {
      processCurrentUser();

      return;
    }

    if (!currentCustomer) {
      obtainNewCustomer();
    }
  }, [
    currentCustomer,
    customersInQueue,
    onQueueCustomersChange,
    processingTime,
  ]);

  useEffect(() => {
    if (reset) {
      isProcessing.current = false;
      setCurrentCustomer(null);
      setProcessedCustomers([]);
      clearTimeout(timeout.current);
    }
  }, [reset]);

  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{currentCustomer ?? "idle"}</td>
      <td>{processedCustomers.join(", ")}</td>
    </tr>
  );
}
