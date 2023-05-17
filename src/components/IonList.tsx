import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import './IonList.css';
import './ionModal';

function Example() {
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
        <IonItem key={index}>
          <IonLabel className='ionLabel'>
            <img src={persona.picture.thumbnail} alt="" />
            <p className='nombres'>{persona.name?.first + ", " + persona.name?.last}</p>
            <IonModal/>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}

export default Example;
