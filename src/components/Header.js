import React from 'react';
import { observer } from 'mobx-react';
import styles from './Header.module.css';


function HeaderComponent(props) {
    const { logout, firstName, onLanding } = props;

    return (
        <div className={styles.header}>
        <div>
          {(!onLanding) && <a href="/"><label className={styles.landingText}>Back to landing page</label></a>}
          <a href="/profile"><label className={styles.helloText}>Hi, {firstName}!</label></a>
          <a href="/"><button className={styles.headerButton} onClick={logout}>Logout</button></a>
        </div>
      </div>
    )
}

export const Header = new observer(HeaderComponent);

