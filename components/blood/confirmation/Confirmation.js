import { useRouter } from 'next/router';
import classes from './Confirmation.module.css'

function Confirmation(props) {
  const router = useRouter()
  let refNo = router.query.referenceNo;
  return (
    <div className={classes.confirmation}>
        <h1>We have received your request.</h1>
        <h2>{props.text}</h2>
        <h2>Reference number {refNo}</h2>
    </div>
  );
}

export default Confirmation;