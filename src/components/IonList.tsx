import React, { useEffect, useState } from 'react';
import { Toast } from '@capacitor/toast';
import { IonButton, IonContent, IonToolbar, useIonAlert } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { IonSearchbar } from '@ionic/react';
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
  let [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const { value: datosExistentes } = await Preferences.get({ key: 'data' });
        if (datosExistentes === null || datosExistentes === 'null' || !datosExistentes || datosExistentes === '[]') {
          fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data => {
              console.log(data.results);
              console.log(45000)
              // Guardar los datos en las preferencias
              const saveData = async () => {
                await Preferences.set({
                  key: 'data',
                  value: JSON.stringify(data.results),
                });
              };
              saveData(); // Llama a la función para guardar los datos
              setData(data.results);
              setResults(data.results)
            })
            .catch(error => {
              console.log('Error:', error);
              showErrorToast();
            })
            .finally(() => {
              setLoad(true);
            });
        } else {
          // Obtener los datos de las preferencias
          const parsedData = datosExistentes !== null ? JSON.parse(datosExistentes) : null;
          setData(parsedData);
          setResults(parsedData)
          setLoad(true);
          console.log(45000000)
        }
      };
      fetchData(); // Llama a la función fetchData para iniciar el proceso
    }, 1000);
  },[]);
  

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  function agregar1Random() {
    const fetchData = async () => {
      const { value: datosExistentes } = await Preferences.get({ key: 'data' });
      if (datosExistentes != null) {
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
            setResults(newData) 
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
      if (datosExistentes != null) {
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
            setResults(newData)
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
      if (datosExistentes != null) {
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
            setResults(newData)
            console.log(data.results[0].picture.thumbnail);
            console.log(newData);
          });
      }
    };
    fetchData();
  }

  async function handleDeleteItem(index: number, name: string) {
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
          handler: async () => {
            setHandlerMessage('Alert confirmed');
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
            setResults(newData)
            setKey(prevKey => prevKey + 1); // Actualizamos la clave única
            console.log(newData);
            Preferences.set({ key: 'data', value: JSON.stringify(newData) });
            setData(newData);
            setResults(newData);
            await showHelloToast(); // Llama a la función para mostrar el toast
          },
        },
      ],
      onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
    });
  }

  console.log(results)

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.name?.first.toLowerCase().indexOf(query) > -1));
  };
  

  async function showHelloToast() {
    await Toast.show({
      text: 'Eliminado con éxito!',
      duration: 'short',
    });
  }

  async function showErrorToast() {
    await Toast.show({
      text: 'Error al consultar Api',
      duration: 'short',
    });
  }
  return (
    <div>
      <IonToolbar>
        <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)} placeholder="Search by first name"></IonSearchbar>
      </IonToolbar>
      {
        !load ? <Loader />
          : <IonList key={key}> {/* Utilizamos la clave única en la lista */}
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {results.map((persona, index) => (
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
