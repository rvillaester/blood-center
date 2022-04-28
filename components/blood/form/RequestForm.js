import React, { useRef } from "react";
import Card from "../../ui/Card";
import classes from "./Form.module.css";
import styles from "../../../styles/Common.module.css";
import { useRouter } from "next/router";
import { constructAPIUrl, getFormattedDateToday, getUserId } from "../../common";

function RequestForm(props) {
  const quantityInputRef = useRef();
  const donorInputRef = useRef();
  const router = useRouter();

  function onCancelHandler () {
    router.push('/');
  }

  async function submitHandler(event) {
    event.preventDefault();
    let url = constructAPIUrl('create-request');
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: getUserId(),
        quantity: quantityInputRef.current.value,
        donor: donorInputRef.current.value
      }),
    });
    let data = await response.json();
    console.log("response: " + JSON.stringify(data));
    let {valid, message} = data;
    if(!valid){
      alert(message);
      return;
    }

    router.push({
      pathname: "/request/confirmation",
      query: {
        referenceNo: data.referenceNo,
      },
    });
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Request Blood</h1>
          <Card>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="quantity">Quantity (ml)</label>
                <input
                  type="number"
                  required
                  id="quantity"
                  ref={quantityInputRef}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="donor">Donor</label>
                <input type="text" id="donor" ref={donorInputRef} />
              </div>
              <div className={classes.actionGroup}>
                <div className={classes.actions}>
                  <button type="submit">Submit</button>
                </div>
                <div className={classes.actions}>
                  <button type="button" onClick={onCancelHandler}>Cancel
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </React.Fragment>
  );
}

export default RequestForm;