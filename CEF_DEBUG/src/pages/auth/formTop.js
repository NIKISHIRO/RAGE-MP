import React from 'react';
import styles from '~/styles.module.css';
import router from '~/routes';
import store from '~s/form';

export default class extends React.Component {
    render() {
        console.log(store);
        return(
            <div className={styles.auth}>
                {/* <button onClick={() => router.setRoute('register')}>click</button> */}
                <div className={`${styles.authBtn} ${styles.register}`}
                        onClick={() => router.setRoute('register')}>Регистрация</div>
                <div className={`${styles.authBtn} ${styles.login}`}
                        onClick={() => router.setRoute('login')}>Авторизация</div>
            </div>
        );
    }
}