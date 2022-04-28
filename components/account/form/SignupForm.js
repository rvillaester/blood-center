import React, { useRef } from "react";
import Card from "../../ui/Card";
import classes from "./Form.module.css";
import styles from "../../../styles/Common.module.css";
import { useRouter } from "next/router";
import { BloodTypes, constructAPIUrl, getFormattedDateToday } from "../../common";

function SignupForm(props) {
  const nameInputRef = useRef();
  const bdayInputRef = useRef();
  const bloodTypeInputRef = useRef();
  const mobileInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  function onCancelHandler () {
    router.push('/');
  }

  async function submitHandler(event) {
    event.preventDefault();
    let birthday = bdayInputRef.current.value;
    if(birthday > getFormattedDateToday()){
      alert('Birth date should not be a future date.');
      return;
    }
    let url = constructAPIUrl('register');
    console.log(url);
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: nameInputRef.current.value,
        birthday: birthday,
        bloodType: bloodTypeInputRef.current.value,
        mobile: mobileInputRef.current.value,
        email: emailInputRef.current.value, 
        password: passwordInputRef.current.value
      })
    });
    let data = await response.json();

    let {valid, message} = data;
    if(!valid){
      alert(message);
      return;
    }
    router.push('/account/confirmation');
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Registration Form</h1>
          <Card>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input type="email" required id="email" ref={emailInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input type="password" required id="password" minLength="8" ref={passwordInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="name">Name</label>
                <input type="text" required id="name" ref={nameInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="bday">Birth Date</label>
                <input type="date" required id="bday" ref={bdayInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="btype">Blood Type</label>
                <select id="btype" name="btype" ref={bloodTypeInputRef}>
                  {BloodTypes.map((bloodType) => (
                    <option value={bloodType} key={bloodType}>{bloodType}</option>
                  ))}
                </select>
              </div>
              <div className={classes.control}>
                <label htmlFor="mobile">Mobile Number</label>
                <input type="text" required id="mobile" ref={mobileInputRef} />
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

export default SignupForm;
