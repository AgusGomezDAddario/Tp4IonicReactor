import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Example from '../components/IonList';
import Modal from '../components/Modal';
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
        <Example />
      </IonContent>
    </IonPage>
  );
};

export default Home;
