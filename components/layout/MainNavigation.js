import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  if (typeof window !== "undefined") {
    var status = localStorage.getItem('status');
    var name = localStorage.getItem('name');
  }
  let authenticated = ('authenticated' === status);
  const router = useRouter();

  function onLogoutHandler() {
    localStorage.setItem('status', 'not-authenticated');
    router.push('/');
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Blood Center of Kidapawan City</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          {
            authenticated && (
              <li>
                <Link href='/admin'>Dashboard</Link>
              </li>
            )
          }
          {
            authenticated && (
              <li>
                <a onClick={onLogoutHandler}>Logout</a>
              </li>
            )
          }

          {
            !authenticated && (
            <li>
              <Link href='/login'>Login</Link>
            </li>
            )
          }
          
          {
            authenticated && (
              <li className={classes.greeting}>
                Hello {name}!
              </li>
            )
          }
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
