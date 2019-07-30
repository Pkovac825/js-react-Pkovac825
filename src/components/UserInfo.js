import React from 'react';
import { observer } from 'mobx-react';
import styles from './UserInfo.module.css';
import { Link } from 'react-router-dom';

function UserInfoComponent(props) {
    const { firstName, lastName, email } = props;
    const imageurl = props.imageurl || "https://www.fillmurray.com/300/300";

    return (
        <div className={styles.main}>
             
            <img src={imageurl}  width="300" height="250"/>
            <div className={styles.info}>
                <label className={styles.name}>{firstName} {lastName}</label>
                <div className={styles.email}>{email}</div>
                <div></div>
                <Link className={styles.edit} to="/profile/edit">Edit</Link>
            </div>

        </div>
    )

}

export const UserInfo = new observer(UserInfoComponent);