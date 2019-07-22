import React from 'react';
import { observer } from 'mobx-react';
import styles from './Header.module.css';
import { action } from 'mobx';


function HeaderComponent(props) {
    const { appState } = props;
    const logout =action("logout", () => appState.userToken = '');

    return (
        <div className={styles.header}>
        <div>
          <a href="/"><button className={styles.headerButton} onClick={logout}>Logout</button></a>
        </div>
      </div>
    )
}

export const Header = new observer(HeaderComponent);

