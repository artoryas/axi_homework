import { InitialStateProps } from "@/app/types/initialState";
import styles from "./InitialState.module.scss";

export default function InitialState({
  counters,
  customers,
  isDisabled,
  onInputChange,
  onInputBlur,
  onCustomersNumberChange,
}: InitialStateProps) {
  return (
    <form className={styles.initialState}>
      <fieldset disabled={isDisabled}>
        {counters.map(({ id, name, processingTime }) => (
          <label key={id}>
            {`${name} Processing Time: `}
            <input
              name={name}
              value={processingTime}
              onChange={(event) => onInputChange(id, event.target.value)}
              onBlur={() => onInputBlur(id)}
              type="number"
            />
          </label>
        ))}
        <label>
          Start Number:
          <input
            type="number"
            value={customers}
            onChange={(event) => onCustomersNumberChange(event.target.value)}
          />
        </label>
      </fieldset>
    </form>
  );
}
