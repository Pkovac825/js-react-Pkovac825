import React from 'react';
import { observer } from 'mobx-react';
import { RegisterComponent } from '../components/Register';
import { createUser } from '../services/userAPI';

function RegisterContainer(props) {

  async function onRegisterSubmit(data, event) {
    event.preventDefault();
    const newUser = await createUser(data.email, data.firstName, data.lastName, data.password);
    if (!newUser.user) {
      return true;
    } else {
      props.history.push('/login');
    }

  }

  return (
    <RegisterComponent onRegisterSubmit={onRegisterSubmit} />
  );
}

export const Register = observer(RegisterContainer);