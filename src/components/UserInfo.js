import React from 'react';
import { observer } from 'mobx-react';
import styles from './UserInfo.module.css';

function UserInfoComponent(props) {
    const { firstName, lastName, email } = props;
    const imageurl = props.imageurl || "https://www.fillmurray.com/300/300";

    return (
        <div className={styles.main}>
             
            <img src={imageurl} className={styles.userImage} />
            <div className={styles.info}>
                <label className={styles.name}>{firstName} {lastName}</label>
                <div className={styles.email}>{email}</div>
                <div></div>
                <a className={styles.edit} href="/profile/edit">Edit</a>
            </div>

        </div>
    )

}

export const UserInfo = new observer(UserInfoComponent);