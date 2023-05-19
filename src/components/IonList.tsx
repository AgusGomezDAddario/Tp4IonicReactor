import React, { useEffect, useState } from 'react';
import { Toast } from '@capacitor/toast';
import { IonButton, IonContent, useIonAlert } from '@ionic/react';
import {
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import Loader from './loader';
import './ExploreContainer.css';

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
  const [key, setKey] = useState(0); // Agregamos una clave única
  const [load, setLoad] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        if (!localStorage.getItem('data')) {
        fetch('https://randomuser.me/api/?results=10')
          .then(response => response.json())
          .then(data => {
            console.log(data.results);
            // Guardar los datos en el localStorage
            localStorage.setItem('data', JSON.stringify(data.results));
            setData(data.results);
            console.log(data.results[0].picture.thumbnail);
          })
          .catch(error => {
            console.log('Error:', error);
          })
          .finally(() => {
            setLoad(true);
          });
        } else {
          // Obtener los datos del localStorage
          const storedData = localStorage.getItem('data');
          const parsedData = storedData !== null ? JSON.parse(storedData) : null;
          setData(parsedData);
          setLoad(true);
        }
      }, 1000);
  }, []);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  function handleDeleteItem(index: number, name: string) {
    presentAlert({
      header: `¿Desea Eliminar a ${name}?`,
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
            setKey(prevKey => prevKey + 1); // Actualizamos la clave única
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
    <div>
      {
      !load ? <Loader /> 
      : <IonList key={key}> {/* Utilizamos la clave única en la lista */}
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
                <img src={persona.picture.thumbnail} alt="" className='perfilImg'/>
                <p className="nombres">
                  {persona.name?.first + ', ' + persona.name?.last}
                </p>
              </IonLabel>
              <IonReorder slot="end" />
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption
                onClick={() => handleDeleteItem(index, persona.name?.first + ' ' + persona.name?.last)}
                color="danger"
              >
                <IonIcon slot="icon-only" icon={trash} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonReorderGroup>
    </IonList>
    }
    </div>
    
  );
};

export default Example;
