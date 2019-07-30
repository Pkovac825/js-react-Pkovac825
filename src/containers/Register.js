import React from 'react';
import { observer } from 'mobx-react';
import { RegisterComponent } from '../components/Register';
import { createUser } from '../services/userAPI';
import { useSetState } from 'react-use';

function RegisterContainer(props) {
  const  [ state, setState ] = useSetState({
    registerError: '',
  });

  async function onRegisterSubmit(data, event) {
    event.preventDefault();
    const newUser = await createUser(data.email, data.firstName, data.lastName, data.password);
    if (!newUser.user) {
      setState({ registerError: "A user with this Email already exists."});
    } else {
      props.history.push('/login');
    }

  }

  return (
    <RegisterComponent onRegisterSubmit={onRegisterSubmit} registerError={state.registerError}/>
  );
}

export const Register = observer(RegisterContainer);