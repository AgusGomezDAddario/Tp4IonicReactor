import React, { useState, useRef, useEffect } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import './Modal.css';

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
        <div className="imagen"> <img src={persona.picture.large} alt="" /> </div>
        <div className="texto">
          <p>Nombre: {persona.name?.first}</p>
          <p>Apellido: {persona.name?.last}</p>
          <p>Genero: {persona.gender}</p>
          <p>Email: {persona.email}</p>
        </div>
      </IonContent>
    </IonModal>
  );
}

export default ExampleModal;
