import React, { useState, useRef, useEffect } from 'react';
import { IonModal, IonContent } from '@ionic/react';
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
    <IonModal
      isOpen={showModal}
      onDidDismiss={dismiss}
      initialBreakpoint={0.25}
      breakpoints={[0, 0.25, 0.5, 0.75]}
      handleBehavior="cycle"
    >
      <IonContent className="ion-padding">
        <div className="ion-margin-top">
          <div className="imagen"> <img src={persona.picture.large} alt="" /> </div>
          <div className="texto">
            <p>Nombre: {persona.name?.first}</p>
            <p>Apellido: {persona.name?.last}</p>
            <p>Género: {persona.gender}</p>
            <p>Email: {persona.email}</p>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
}

export default ExampleModal;

