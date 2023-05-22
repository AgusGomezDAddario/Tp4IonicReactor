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
      breakpoints={[0, 0.25, 0.5, 0.75, 0.95]}
      handleBehavior="cycle"
    >
      <IonContent className="ion-padding">
        <div className="ion-margin-top">
          <div className="imagen"> <img className="perfil" src={persona.picture.large} alt="" /> </div>
          <div className="texto">
            <h1 className='fuente nombre'>{persona.name?.first + " " + persona.name?.last}</h1>
            <div className='infoPersonal'>
              <p className='fuente'>- Edad: {persona.dob.age}</p>
              <p className='fuente'>- Email: {persona.email}</p>
              <p className='fuente'>- Pais: {persona.location.country}</p>
              <p className='fuente'>- Ciudad: {persona.location.city}</p>
              <p className='fuente'>- Calle: {persona.location.street.name + ' ' + persona.location.street.number}</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
}

export default ExampleModal;

