import React, { useRef } from "react";
import Card from "../../ui/Card";
import classes from "./Form.module.css"
import styles from '../../../styles/Common.module.css'
import Link from "next/link";
import { useRouter } from "next/router";

function DonateForm(props) {
    const nameInputRef = useRef();
    const bdayInputRef = useRef();
    const bloodTypeInputRef = useRef();
    const mobileInputRef = useRef();
    const emailInputRef = useRef();
    const quantityInputRef = useRef();
    const router = useRouter();
    async function submitHandler(event) {
        event.preventDefault();
        let url = 'https://njwckx30s1.execute-api.ap-southeast-1.amazonaws.com/dev/create-donation';
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: nameInputRef.current.value,
                birthday: bdayInputRef.current.value,
                bloodType: bloodTypeInputRef.current.value,
                mobile: mobileInputRef.current.value,
                email: emailInputRef.current.value,
                quantity: quantityInputRef.current.value
            })
        })
        let data = await response.json();
        console.log('response: ' + JSON.stringify(data));
        router.push(
            {
              pathname: '/donate/confirmation',
              query: 
                {
                    referenceNo: data.referenceNo
                }
            },
          );
        // router.push('/donate/confirmation');
    }
    
    return (
        <React.Fragment>
            <div className={styles.container}>
                <main className={styles.main}>
                <h1 className={styles.title}>
                    Donate Blood
                </h1>
            <Card>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' required id='name' ref={nameInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='bday'>Birth Date</label>
                    <input type="date" required id='bday' ref={bdayInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='btype'>Blood Type</label>
                    <select id="btype" name="btype" ref={bloodTypeInputRef}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='mobile'>Mobile Number</label>
                    <input type="text" required id='mobile' ref={mobileInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" required id='email' ref={emailInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='quantity'>Quantity (ml)</label>
                    <input type="number" required id='quantity' ref={quantityInputRef} />
                    </div>
                    <div className={classes.actionGroup}>
                    <div className={classes.actions}>
                        <button type="Submit">Submit</button>
                    </div>
                    <div className={classes.actions}>
                        <button>
                            <Link href='/'>
                            Cancel
                            </Link>
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

export default DonateForm;