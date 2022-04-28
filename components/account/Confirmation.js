import Link from 'next/link';
import classes from './Confirmation.module.css'

function Confirmation(props) {
  return (
    <div className={classes.confirmation}>
        <h1>Congratulations!! Registration is complete.</h1>
        <h2>You now <Link href='/account/login'><a className={classes.link}>Login</a></Link> to start using the service!!</h2>
    </div>
  );
}

export default Confirmation;