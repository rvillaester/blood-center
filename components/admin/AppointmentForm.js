import { useRouter } from "next/router";
import classes from "../blood/form/Form.module.css"
import styles from "../../styles/Common.module.css";
import { useRef } from "react";
import React from "react";
import Card from "../ui/Card";
import {getFormattedDateToday, constructAPIUrl} from "../common";

function AppointmentForm(props) {
  const router = useRouter();
  let refNo = router.query.referenceNo;
  const appointmentDateInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    let appointmentDate = appointmentDateInputRef.current.value;

    if(appointmentDate < getFormattedDateToday()) {
      alert('Appointment date should not be a date in the past.');
      return;
    }

    let url = constructAPIUrl('takeAction');
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "Scheduled",
        id: refNo,
        appointmentDate: appointmentDate
      }),
    });
    onBackHandler();
  }

  function onBackHandler() {
    router.push({
      pathname: "/admin/view",
      query: {
        referenceNo: refNo,
      },
    });
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Schedule an Appointment</h1>
          <Card>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="appointmentDate">Appointment Date</label>
                <input type="date" required id="appointmentDate" ref={appointmentDateInputRef} />
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

export default AppointmentForm;