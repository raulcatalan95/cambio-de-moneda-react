import { useState, useEffect } from "react";
import Input from "../components/Input";
import Selector from "../components/Selector";

const Home = () => {
  const [dataCurrencies, setDataCurrencies] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [amountCurrency, setAmountCurrency] = useState('');
  const [amountPesos, setAmountPesos] = useState('');

    const handleChangeSelector = (event) => {
      const selectedCurrency = dataCurrencies.find((item) => event.target.value === item.codigo);
      setSelectedOption(selectedCurrency);
      setAmountCurrency('');
    };

    const trasnformToPeso = () => {
        if (amountCurrency) {
          const totalPesos = +amountCurrency * selectedOption.valor;
          setAmountPesos(totalPesos.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }));
        } else {
          setAmountPesos('')
        }
    };

  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then(response => response.json())
      .then(data => {
        const dataArray = Object.entries(data).map(([clave, valor]) => valor.codigo ? { ...valor } : null);
        const filterArray = dataArray.filter((data) => data);
        console.log(filterArray);
        setDataCurrencies(filterArray);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
    
  return (
   <div className="flex flex-col justify-center items-center mt-6 px-6 gap-4">
    <div className="w-full">
      <h1 className="text-2xl mb-4">Cambiar divisas a pesos</h1>
      <label htmlFor="select-currency">Selecciona una divisa</label>
      <Selector id="select-currency" options={dataCurrencies} handleChange={handleChangeSelector} selectedOption={selectedOption}/>
    </div>
    {
      selectedOption.codigo &&
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full">
          <label htmlFor="amount">Ingresa monto en {selectedOption.nombre}</label>
          <Input id="amount" amount={amountCurrency} setValorInput={setAmountCurrency} isChile={false} trasnformToPeso={trasnformToPeso} />
          </div>
          <div className="w-full">
          <label htmlFor="chile-currency">Pesos Chilenos</label>
          <Input id="chile-currency" amount={amountPesos} setValorInput={setAmountPesos} isChile={true} trasnformToPeso={trasnformToPeso} />
          </div>
        </div>
    }
    </div>

  )
}

export default Home