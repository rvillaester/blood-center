import Link from 'next/link';
import classes from './Card.module.css';

function NavigatingCard(props) {
    return <Link href={props.path} className={classes.card}>{props.children}</Link>;
}

export default NavigatingCard;