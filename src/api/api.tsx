import { Preferences } from '@capacitor/preferences';

interface ExampleProps {
    showErrorToast: Function;
    setData: Function;
    setResults: Function;
    setLoad: Function;
  }

export const api = ({ showErrorToast, setData, setResults, setLoad }: ExampleProps) => {
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
};

export const apiWith1or5or10 = ({ showErrorToast, setData, setResults, setLoad,}: ExampleProps, datosExistentes:any, cant:Number) => {
    fetch(`https://randomuser.me/api/?results=${cant}`)
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
          })
          .catch(error => {
            console.log('Error:', error);
            showErrorToast();
          })
          .finally(() => {
            setLoad(true);
          });
}