import { InitialStateProps } from "@/app/types/initialState";
import styles from "./InitialState.module.scss";

export default function InitialState({
  counters,
  customers,
  isDisabled,
  onInputChange,
  onCustomersNumberChange,
}: InitialStateProps) {
  return (
    <form className={styles.initialState}>
      <fieldset className={styles.initialState__fieldset} disabled={isDisabled}>
        {counters.map(({ id, name, processingTime }) => (
          <label className={styles.initialState__label} key={id}>
            {`${name} Processing Time: `}
            <input
              className={styles.initialState__input}
              name={name}
              value={processingTime}
              onChange={(event) => onInputChange(id, event.target.value)}
              type="text"
            />
          </label>
        ))}
        <label className={styles.initialState__label}>
          Start Number:
          <input
            className={styles.initialState__input}
            type="text"
            value={customers}
            onChange={(event) => onCustomersNumberChange(event.target.value)}
          />
        </label>
      </fieldset>
    </form>
  );
}
