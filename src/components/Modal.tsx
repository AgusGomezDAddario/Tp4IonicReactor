import React, { useState, useRef, useEffect } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/react';

interface ExampleProps {
  setShowModal: Function;
  showModal: boolean;
  persona: any;
}

const ExampleModal = ({ setShowModal, showModal, persona }: ExampleProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    setShowModal(false);
  }

  useEffect(() => {
    if (showModal) {
      modal.current?.present();
    } else {
      modal.current?.dismiss();
    }
  }, [showModal]);

  return (
    <IonModal isOpen={showModal} ref={modal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <img src={persona.picture.medium} alt="" />
        <p>{persona.name?.first}</p>
      </IonContent>
    </IonModal>
  );
}

export default ExampleModal;
