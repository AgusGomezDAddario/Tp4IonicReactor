import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>API Random User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">API Random User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Lista de usuarios consumidos de la API</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
