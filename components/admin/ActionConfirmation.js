import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./ActionConfirmation.module.css"

function ActionConfirmation(props) {
    const router = useRouter()
    let action = router.query.action;
    return (
      <div className={classes.confirmation}>
          <h1>The request has been {action}.</h1>
          <button>
              <Link href='/dashboard'>Back To Dashboard</Link></button>
      </div>
    );
}

export default ActionConfirmation;