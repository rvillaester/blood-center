import React, { useRef } from "react";
import Card from "../../ui/Card";
import classes from "./Form.module.css"
import styles from '../../../styles/Common.module.css'
import { useRouter } from "next/router";
import {constructAPIUrl} from "../../common";

function LoginForm(props) {
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter();

    function onCancelHandler () {
      router.push('/');
    }

    async function submitHandler(event) {
        event.preventDefault();
        let url = constructAPIUrl('login');
        let username = userNameInputRef.current.value;
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: passwordInputRef.current.value,
            })
        })
        let status = response.status;
        console.log(status);
        if(status != 200) {
            alert('Invalid username or password');
        } else {
            let data = await response.json();
            let name = data.name.split(' ')[0];
            if (typeof window !== "undefined") {
                localStorage.setItem('status', 'authenticated');
                localStorage.setItem('name', name);
                localStorage.setItem('isAdmin', data.isAdmin);
                localStorage.setItem('userId', username);
            }

            if(data.isAdmin)
                router.push('/dashboard');
            else
                router.push('/');
        }
    }
    
    return (
        <React.Fragment>
            <div className={styles.container}>
                <main className={styles.main}>
                <h1 className={styles.title}>
                    Login Form
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
                        <button type="submit">Login</button>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={onCancelHandler}>
                            Cancel
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