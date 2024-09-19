import { TableProps } from "@/app/types/table";
import styles from "./Table.module.scss";
import { PropsWithChildren, useRef } from "react";

const TABLE_FIELD = ["Counter", "Processing", "Processed"];

export default function Table({
  liveCustomers,
  children,
  onAddCustomer,
}: PropsWithChildren<TableProps>) {
  const lastCustomer = useRef<number>(0);

  const addNewCustomer = () => {
    lastCustomer.current++;

    onAddCustomer(lastCustomer.current);
  };

  return (
    <table className={styles.table}>
      <caption>
        <div>
          Number of people waiting: {liveCustomers.length}
          <button onClick={addNewCustomer}>
            Add next {lastCustomer.current + 1}
          </button>
        </div>
      </caption>
      <thead>
        <tr>
          {TABLE_FIELD.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
