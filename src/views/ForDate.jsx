import { useState } from "react";
import Selector from "../components/Selector"
import Loader from "../components/Loader";

const ForDate = ({dataCurrencies}) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseDate, setResponseDate] = useState({});

  const handleChangeSelector = (event) => {
    const selectedCurrency = dataCurrencies.find((item) => event.target.value === item.codigo);
    setSelectedOption(selectedCurrency);
  };

  const handleChangeDate = (event) => {
    const date = event.target.value
    const arrayDate = date.split('-');
    const reverseArray = [...arrayDate].reverse();
    const dateFormat = reverseArray.join('-');
    setSelectedDate(dateFormat);
  };

const searchValueForDate = () => {
  setIsLoading(true);
  fetch(`https://mindicador.cl/api/${selectedOption.codigo}/${selectedDate}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResponseDate(data);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  return (
    <>
    { isLoading && <Loader /> }
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl mb-5">Buscar valor por fecha</h1>
      <div className="w-full">
        <label>Selecciona una divisa</label>
        <Selector id="select-currency" options={dataCurrencies} handleChange={handleChangeSelector} selectedOption={selectedOption}/>
      </div>
      {
        selectedOption.codigo &&
          <div className="flex flex-col w-full">
            <label htmlFor="date">Selecciona una fecha</label>
            <input
            type="date"
            id="date"
            onChange={handleChangeDate}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
          />
          {
            responseDate.nombre &&
              (responseDate.serie[0]
                ?
                  <div className="text-white bg-blue-900 rounded-lg p-4 mt-5">
                    <p className="text-sm">
                      Valor <span className="font-bold">{responseDate.nombre}</span> el
                      <span className="font-bold"> {new Date(responseDate.serie[0].fecha).toLocaleDateString('es-es', {year:"numeric", month:"short", day:"numeric"}) }</span> es de 
                      <span className="font-bold"> {responseDate.serie[0].valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span> pesos.
                    </p>
                  </div>
                :
                  <div className="text-white bg-red-400 rounded-lg p-4 mt-5">
                  <p className="text-sm">
                    No se encontraron valores para esta fecha
                  </p>
                </div>)
          }
          <button
          onClick={() => searchValueForDate()}
          disabled={!selectedDate}
          className="dark:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-5">
            Buscar valor
          </button>
        </div>
      }
    </div>
    </>
  )
}

export default ForDate