import React, { useEffect, useState } from 'react';
import { IonButton, useIonAlert } from '@ionic/react';
import { Toast } from '@capacitor/toast';
import {
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from '@ionic/react';
import { trash } from 'ionicons/icons';

interface ExampleProps {
  setShowModal: Function;
  setPersona: Function;
  persona: any[];
}

const Example = ({ setShowModal, setPersona, persona }: ExampleProps) => {
  const [data, setData] = useState<any[]>([]);
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState('');
  const [roleMessage, setRoleMessage] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        setData(data.results);
        console.log(data.results[0].picture.thumbnail);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  function handleDeleteItem(index: number) {
    presentAlert({
      header: '¿Desea Eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            setHandlerMessage('Alert canceled');
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            setHandlerMessage('Alert confirmed');
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
            showHelloToast(); // Llama a la función para mostrar el toast
          },
        },
      ],
      onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
    });
  }

  async function showHelloToast() {
    Toast.show({
      text: 'Eliminado con éxito!',
    });
  }
  return (
    <IonList>
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
        {data.map((persona, index) => (
          <IonItemSliding key={index}>
            <IonItem
              className="item"
              button
              onClick={() => {
                setShowModal(true);
                setPersona(persona);
              }}
            >
              <IonLabel className="ionLabel">
                <img src={persona.picture.thumbnail} alt="" />
                <p className="nombres">
                  {persona.name?.first + ', ' + persona.name?.last}
                </p>
              </IonLabel>
              <IonReorder slot="end" />
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption
                onClick={() => handleDeleteItem(index)}
                color="danger"
              >
                <IonIcon slot="icon-only" icon={trash} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonReorderGroup>
    </IonList>
  );
};

export default Example;
