import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './MainNavigation.module.css';
import {isAdmin, isAuthenticated} from '../common';

function MainNavigation() {

  if (typeof window !== "undefined") {
    var name = localStorage.getItem('name');
  }
  const router = useRouter();

  function onInfoHandler() {
    if(isAdmin()) return;
    router.push('/account/info');
  }

  function onLogoutHandler() {
    localStorage.setItem('status', 'not-authenticated');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    router.push('/');
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Blood Center of Kidapawan City</div>
      <nav>
        <ul>
          { !isAdmin() && 
            <li>
              <Link href='/'>Home</Link>
            </li>
          }
          {
            isAuthenticated() && (
              <li>
                <Link href='/dashboard'>Dashboard</Link>
              </li>
            )
          }
          {
            isAuthenticated() && (
              <li>
                <a onClick={onLogoutHandler}>Logout</a>
              </li>
            )
          }

          {
            !isAuthenticated() && (
            <li>
              <Link href='/account/login'>Login</Link>
            </li>
            )
          }
          
          {
            isAuthenticated() && (
              <li className={classes.greeting} onClick={onInfoHandler}>
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
