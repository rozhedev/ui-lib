import Btn from "../ui/Btn";
import styles from "./Counter.module.css";
import { useState } from "react";

const Counter = ({ ...props }) => {
    const [count, setCount] = useState(0);
    let isDisabled = false;

    const incrementHandler = () => setCount(count + 1);
    const decrementHandler = () => setCount(count - 1);

    return (
        <div>
            <h3>Counter</h3>
            <div className={styles.Counter}>
                <span className={styles.CounterValue}>{count}</span>
                <Btn
                    type="button"
                    onClick={incrementHandler}
                    disabled={isDisabled}
                >
                    +
                </Btn>
                <Btn
                    type="button"
                    onClick={decrementHandler}
                    disabled={count <= 0 ? !isDisabled : isDisabled}
                >
                    -
                </Btn>
            </div>
        </div>
    );
};

export default Counter;
