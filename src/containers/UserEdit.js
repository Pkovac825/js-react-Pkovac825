import React from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { UserEditModal } from '../components/UserEditModal';
import { useSetState } from 'react-use';
import { createSession } from '../services/sessionAPI';
import { updateUser } from '../services/userAPI';
import { uploadImage } from '../services/imageAPI';


function UserEditContainer(props) {
  const { appState } = React.useContext(AppContext);
  const [state, setState] = useSetState({
    editError: '',
  });

  async function checkEdit(data, files) {
    const newSession = await createSession(appState.user.email, data.oldPassword);
    if (!newSession.session) {
      setState({ editError: "The old password is not correct!" });
    } else {
      if(data.newPassword === data.confirmPassword) {
        if(files.length) {
          await uploadImage(files[0], appState);
        }
        const user = await updateUser(data.email, data.newPassword, appState.user.imageurl, appState);
        if(user.user.id) {
          props.history.push("/profile");
        } else {
          setState({ editError: "Email is already taken!" });
        }
      } else {
        setState({ editError: "New password must match confirm password!" });
      }
    }
  }

  return (
    <>
      {
        <UserEditModal email={appState.user.email} username={appState.user.username} checkEdit={checkEdit} editError={state.editError} />
      }
    </>
  )
}

export const UserEdit = observer(UserEditContainer);