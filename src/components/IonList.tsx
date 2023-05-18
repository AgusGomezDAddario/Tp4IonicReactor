import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import './ExploreContainer.css';
import { IonIcon, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import { archive, heart, trash } from 'ionicons/icons';


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

  return (
    <IonList>
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
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption color="danger">
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))
      }

    </IonList >
  );
}

export default Example;
