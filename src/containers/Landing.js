import React from 'react';
import { useAsync } from 'react-use';
import { ChosenFlights } from '../components/ChosenFlights';
import { appState } from '../state/AppState';
import { userState } from '../state/UserState';
import { loadFlights } from '../services/flights';
import { observer } from 'mobx-react';

function LandingContainer(props) {
  useAsync(loadFlights.bind(null, appState, userState.userToken));

  return (
     <ChosenFlights responseFlights={appState.flights} history={props.history} />
  );
}

export const Landing = observer(LandingContainer);