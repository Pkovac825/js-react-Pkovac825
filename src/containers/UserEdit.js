import React from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { UserEditModal } from '../components/UserEditModal';
import { useSetState } from 'react-use';
import { createSession } from '../services/sessionAPI';
import { updateUser } from '../services/userAPI';
import { uploadImage } from '../services/imageAPI';
import { action } from 'mobx';

/**
 * Container for the profile edit modal which appears if the user wants to edit his profile.
 * Matches path "profile/edit"
 */
function UserEditContainer(props) {
  const { appState } = React.useContext(AppContext);
  const [state, setState] = useSetState({
    editError: '',
  });

  /**
   * 
   * @param data - Data recieved from React-form.
   * @param {File} files - Files recieved from React-dropzone. 
   */
  async function checkEdit(data, files) {
    const newSession = await createSession(appState.user.email, data.oldPassword);
    if (!newSession.session) {
      setState({ editError: "The old password is not correct!" });
    } else if (data.newPassword && !(5 < data.newPassword.length <= 20)) {
      setState({ editError: "New password must have between 5 and 20 characters." });
    } else if (data.newPassword === data.confirmPassword) {

      if (files.length) {
        await uploadImage(files[0], appState);
      }
      const changeUsername = action("username", () => appState.user.username = data.username);
      changeUsername();
      const user = await updateUser(data.email, data.newPassword ? data.newPassword : data.oldPassword, appState.user.imageurl, appState);
      if (user.user.id) {
        props.history.push("/profile");
      } else {
        setState({ editError: "Email is already taken!" });
      }

    } else {
      setState({ editError: "New password must match confirm password!" });
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