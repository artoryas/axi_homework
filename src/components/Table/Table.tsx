import { TableProps } from "@/app/types/table";
import styles from "./Table.module.scss";
import { PropsWithChildren } from "react";

const TABLE_FIELD = ["Counter", "Processing", "Processed"];

export default function Table({
  customersInQueue,
  lastCustomerNumber,
  children,
  onAddCustomerToQueue,
}: PropsWithChildren<TableProps>) {
  return (
    <table className={styles.table}>
      <caption>
        <div className={styles.table__captionWrapper}>
          <div>
            Number of people waiting: <strong>{customersInQueue.length}</strong>
          </div>
          <button
            className={styles.table__addCustomerButton}
            onClick={onAddCustomerToQueue}
          >
            Add next {lastCustomerNumber + 1}
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
