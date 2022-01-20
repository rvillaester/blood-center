import React, { useRef } from "react";
import Card from "../../ui/Card";
import classes from "./Form.module.css"
import styles from '../../../styles/Common.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import {constructAPIUrl} from "../../common";

function LoginForm(props) {
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter();
    async function submitHandler(event) {
        event.preventDefault();
        let url = constructAPIUrl('login');
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: userNameInputRef.current.value,
                password: passwordInputRef.current.value,
            })
        })
        let status = response.status;
        console.log(status);
        if(status != 200) {
            alert('Invalid username or password');
        } else {
            let data = await response.json();
            let d = JSON.stringify(data);
            console.log(`name ${d}`);
            if (typeof window !== "undefined") {
                localStorage.setItem('status', 'authenticated');
                localStorage.setItem('name', data.name);
            }
            router.push('/admin');
        }
    }
    
    return (
        <React.Fragment>
            <div className={styles.container}>
                <main className={styles.main}>
                <h1 className={styles.title}>
                    Admin Log In
                </h1>
            <Card>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' required id='username' ref={userNameInputRef} />
                    </div>
                    <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type="password" required id='password' ref={passwordInputRef} />
                    </div>
                    <div className={classes.actionGroup}>
                    <div className={classes.actions}>
                        <button type="Submit">Login</button>
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

export default LoginForm;