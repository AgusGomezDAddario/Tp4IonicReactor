import React, { useState, useRef, useEffect } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage } from '@ionic/react';

interface ExampleProps {
  setShowModal: Function;
  showModal: boolean;
  persona: any;
}

const ExampleModal = ({setShowModal, showModal, persona} : ExampleProps) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }


  console.log(9)
  console.log(showModal)
  return (
    <div>
        <IonModal isOpen={showModal} ref={modal} trigger="open-modal" canDismiss={canDismiss} presentingElement={presentingElement!}>
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
    </div>
  );
}

export default ExampleModal