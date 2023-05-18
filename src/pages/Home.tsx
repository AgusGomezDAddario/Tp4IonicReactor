import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Example from '../components/IonList';
import ExampleModal from '../components/Modal';
import './Home.css';
import React, { useState, useRef, useEffect } from 'react'

const Home: React.FC = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [persona, setPersona] = useState<any[]>([]);
  console.log(showModal)

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
        <Example 
          setShowModal={setShowModal}
          setPersona={setPersona}
          persona={persona}/>
      </IonContent>
      {showModal ? <ExampleModal persona={persona} setShowModal={setShowModal} showModal={showModal}/> : null}
    </IonPage>
  );
};

export default Home;
