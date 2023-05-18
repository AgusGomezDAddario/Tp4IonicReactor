import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import './ExploreContainer.css';
import { IonIcon, IonItemOption, IonItemOptions, IonItemSliding,  IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react';
import { trash } from 'ionicons/icons';


interface ExampleProps {
  setShowModal: Function;
  setPersona: Function;
  persona: any[];
}

const Example = (
  { setShowModal, setPersona, persona }: ExampleProps) => {

  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        setData(data.results);
        console.log(data.results[0].picture.thumbnail)
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  return (
    <IonList>
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
      {data.map((persona, index) => (
        <IonItemSliding>
          <IonItem className="item" key={index} button
            onClick={() => {
              setShowModal(true);
              setPersona(persona);
            }}>
            <IonLabel className='ionLabel'>
              <img src={persona.picture.thumbnail} alt="" />
              <p className='nombres'>{persona.name?.first + ", " + persona.name?.last}</p>
            </IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption color="danger">
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))
      }
      </IonReorderGroup>
    </IonList >
  );
}

export default Example;
