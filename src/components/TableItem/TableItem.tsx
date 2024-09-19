"use client";

import { ONE_SECOND } from "@/app/constants/common";
import { TableItemProps } from "@/app/types/table";
import { useEffect, useRef, useState } from "react";

export default function TableItem({
  id,
  name,
  liveCustomers,
  reset,
  onLiveCustomersChange,
  processingTime,
}: TableItemProps) {
  const [currentCustomer, setCurrentCustomer] = useState<number | null>(null);
  const [processedCustomers, setProcessedCustomers] = useState<number[]>([]);
  const isProcessing = useRef(false);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (currentCustomer && !isProcessing.current) {
      isProcessing.current = true;
      timeout.current = setTimeout(() => {
        setProcessedCustomers((state) => [...state, currentCustomer]);
        setCurrentCustomer(null);
        isProcessing.current = false;
      }, processingTime * ONE_SECOND);

      return;
    }

    if (!currentCustomer) {
      if (liveCustomers.length === 0) return;
      const nextCustomer = liveCustomers.shift() as number;
      console.log(nextCustomer);
      setCurrentCustomer(nextCustomer);
      onLiveCustomersChange(liveCustomers);
    }
  }, [currentCustomer, liveCustomers, onLiveCustomersChange, processingTime]);

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
      <td>{processedCustomers.join(",")}</td>
    </tr>
  );
}
