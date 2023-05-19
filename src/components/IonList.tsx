import React, { useEffect, useState } from 'react';
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
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
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
