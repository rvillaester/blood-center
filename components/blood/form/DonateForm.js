import React, { useRef } from "react";
import Card from "../../ui/Card";
import classes from "./Form.module.css";
import styles from "../../../styles/Common.module.css";
import { useRouter } from "next/router";
import { BloodTypes, constructAPIUrl, calculateAge, getUserId } from "../../common";

function DonateForm(props) {
  const quantityInputRef = useRef();
  const router = useRouter();

  function onCancelHandler () {
    router.push('/');
  }

  async function submitHandler(event) {
    event.preventDefault();
    let url = constructAPIUrl('create-donation');
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        quantity: quantityInputRef.current.value,
        userId: getUserId()
      }),
    });
    let data = await response.json();

    let {valid, message} = data;
    if(!valid){
      alert(message);
      return;
    }

    console.log("response: " + JSON.stringify(data));
    router.push({
      pathname: "/donate/confirmation",
      query: {
        referenceNo: data.referenceNo,
      },
    });
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Donate Blood</h1>
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
              <div className={classes.actionGroup}>
                <div className={classes.actions}>
                  <button type="submit">Submit</button>
                </div>
                <div className={classes.actions}>
                  <button type="button" onClick={onCancelHandler}>Cancel</button>
                </div>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </React.Fragment>
  );
}

export default DonateForm;
