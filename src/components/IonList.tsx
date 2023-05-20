import React, { useEffect, useState } from 'react';
import { Toast } from '@capacitor/toast';
import { IonButton, IonContent, useIonAlert } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
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
      const fetchData = async () => {
        const { value: datosExistentes } = await Preferences.get({ key: 'data' });
        if (datosExistentes === null || datosExistentes === 'null') {
          fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data => {
              console.log(data.results);
              // Guardar los datos en las preferencias
              const saveData = async () => {
                await Preferences.set({
                  key: 'data',
                  value: JSON.stringify(data.results),
                });
              };
              saveData(); // Llama a la función para guardar los datos
            })
            .catch(error => {
              console.log('Error:', error);
            })
            .finally(() => {
              setLoad(true);
            });
        } else {
          // Obtener los datos de las preferencias
          const parsedData = datosExistentes !== null ? JSON.parse(datosExistentes) : null;
          setData(parsedData);
          setLoad(true);
        }
      };
  
      fetchData(); // Llama a la función fetchData para iniciar el proceso
    }, 1000);
  }, []);
  

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  function agregar1Random() {
    const fetchData = async () => {
      const { value: datosExistentes } = await Preferences.get({ key: 'data' });
      if (datosExistentes === null) {
        fetch('https://randomuser.me/api/?results=1')
          .then(response => response.json())
          .then(data => {
            console.log(data.results[0]);
            let newData = [];
            if (datosExistentes) {
              const parsedData = JSON.parse(datosExistentes);
              newData = [...parsedData, ...data.results];
            } else {
              newData = data.results;
            }
            // Guardar los datos en las preferencias
            Preferences.set({ key: 'data', value: JSON.stringify(newData) });
            setData(newData);
            console.log(data.results[0].picture.thumbnail);
            console.log(newData);
          });
      }
    };
    fetchData();
  }
  

  function agregar5Random() {
    const fetchData = async () => {
      const { value: datosExistentes } = await Preferences.get({ key: 'data' });
      if (datosExistentes === null) {
        fetch('https://randomuser.me/api/?results=5')
          .then(response => response.json())
          .then(data => {
            console.log(data.results[0]);
            let newData = [];
            if (datosExistentes) {
              const parsedData = JSON.parse(datosExistentes);
              newData = [...parsedData, ...data.results];
            } else {
              newData = data.results;
            }
            // Guardar los datos en las preferencias
            Preferences.set({ key: 'data', value: JSON.stringify(newData) });
            setData(newData);
            console.log(data.results[0].picture.thumbnail);
            console.log(newData);
          });
      }
    };
    fetchData();
  }

  function agregar10Random() {
    const fetchData = async () => {
      const { value: datosExistentes } = await Preferences.get({ key: 'data' });
      if (datosExistentes === null) {
        fetch('https://randomuser.me/api/?results=10')
          .then(response => response.json())
          .then(data => {
            console.log(data.results[0]);
            let newData = [];
            if (datosExistentes) {
              const parsedData = JSON.parse(datosExistentes);
              newData = [...parsedData, ...data.results];
            } else {
              newData = data.results;
            }
            // Guardar los datos en las preferencias
            Preferences.set({ key: 'data', value: JSON.stringify(newData) });
            setData(newData);
            console.log(data.results[0].picture.thumbnail);
            console.log(newData);
          });
      }
    };
    fetchData();
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
            console.log(newData);
            Preferences.set({ key: 'data', value: JSON.stringify(newData) });
            setData(newData);
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
                      <img src={persona.picture.thumbnail} alt="" className='perfilImg' />
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
            <div className='buttonsAdds'>
              <IonButton onClick={agregar1Random} className='button'>+1</IonButton>
              <IonButton onClick={agregar5Random} className='button'>+5</IonButton>
              <IonButton onClick={agregar10Random} className='button'>+10</IonButton>
            </div>
          </IonList>
      }
    </div>

  );
};

export default Example;
