import React from 'react';
import { observer } from 'mobx-react';
import styles from './UserEditModal.module.css';
import useForm from 'react-hook-form';
import { useDropzone } from 'react-dropzone'
import { useSetState } from 'react-use';
import { Link } from 'react-router-dom';

function UserEditModalContainer(props) {
    const [state, setState] = useSetState({
        files: [],
    });
    const { email, username, checkEdit, editError } = props;
    const { register, handleSubmit, errors } = useForm();
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function accept(acceptedFiles) {
        setState({
            files: acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
        });
      }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: accept,
    });

    function submitAction(data, event) {
        event.preventDefault();
        checkEdit(data, state.files);
    };


    return (
        <>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                <Link className={styles.closeText} to="/profile">Cancel</Link>
                    <p className={styles.topText}>Edit Profile</p>
                    <div {...getRootProps()} className={styles.dropzone}>
                        <input {...getInputProps()} />
                        {state.files.length ? <img src={state.files[0].preview} className={styles.center}/>
                            :
                            isDragActive ?
                                <p className={styles.dropText}>Drop your picture!</p> :
                                <p className={styles.dropText}>Drag and drop your pictures here or click to select picture!</p>
                        }
                    </div>
                    <form onSubmit={handleSubmit(submitAction)}>
                        <div className={styles.formGrid}>
                            <div className={styles.username}>
                                <p className={styles.smallText}>Username</p>
                                <input type="text" className={styles.formElement} placeholder="Username" name="username" defaultValue={username}
                                    ref={register({
                                        required: true,
                                    })} />
                                {errors.username && <div className={styles.errorMsg}>{errors.username}</div>}
                            </div>

                            <div className={styles.email}>
                                <p className={styles.smallText}>E-mail</p>
                                <input type="email" className={styles.formElement} placeholder="Email" name="email" defaultValue={email}
                                    ref={register({
                                        required: false,
                                        pattern,
                                    })} />
                                {errors.email && <div className={styles.errorMsg}>Must input valid Email.</div>}
                            </div>

                            <div className={styles.oldPassword}>
                                <p className={styles.smallText}>Old password</p>
                                <input type="password" className={styles.formElement} placeholder="Password" name="oldPassword"
                                    ref={register({
                                        required: true,
                                        minLength: 5,
                                        maxLength: 19
                                    })} />
                                {errors.oldPassword && <div className={styles.errorMsg}>Must input old password to make changes.</div>}
                            </div>


                            <div className={styles.newPassword}>
                                <p className={styles.smallText}>New Password</p>
                                <input type="password" className={styles.formElement} placeholder="Password" name="newPassword"
                                    ref={register({})} />
                            </div>

                            <div className={styles.confirmPassword}>
                                <p className={styles.smallText}>Confirm password</p>
                                <input type="password" className={styles.formElement} placeholder="Password" name="confirmPassword"
                                    ref={register({})} />
                            </div>
                            {editError && <p className={styles.editError}>{editError}</p>}

                        </div>
                        <input className={styles.blueButton} type="submit" value="Save changes" />
                    </form>


                </div>
            </div>


        </>
    );
}

export const UserEditModal = observer(UserEditModalContainer);