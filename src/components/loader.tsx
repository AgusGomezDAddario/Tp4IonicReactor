import React from 'react';
import { IonHeader, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';

function Loader() {
  return (
        <IonProgressBar type="indeterminate"></IonProgressBar>
  );
}
export default Loader;