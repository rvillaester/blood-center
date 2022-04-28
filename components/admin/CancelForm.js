import { useRouter } from "next/router";
import classes from "./CancelForm.module.css";
import styles from "../../styles/Common.module.css";
import { useRef } from "react";
import React from "react";
import Card from "../ui/Card";
import {constructAPIUrl} from "../common";

function CancelForm(props) {
  const router = useRouter();
  let refNo = router.query.referenceNo;
  const reasonInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    let reason = reasonInputRef.current.value;
    let url = constructAPIUrl('takeAction');
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "Cancelled",
        id: refNo,
        reason: reason,
      }),
    });
    onBackHandler();
  }

  function onBackHandler() {
    router.push({
      pathname: "/dashboard/view",
      query: {
        referenceNo: refNo,
      },
    });
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Request Cancellation</h1>
          <Card>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="reason">Cancellation Reason</label>
                <input type="text" required id="reason" ref={reasonInputRef} />
              </div>

              <div className={classes.actionGroup}>
                <div className={classes.actions}>
                  <button type="submit">Submit</button>
                </div>
                <div className={classes.actions}>
                  <button onClick={onBackHandler}>Back</button>
                </div>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </React.Fragment>
  );
}

export default CancelForm;
