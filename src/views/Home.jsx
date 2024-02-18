import { useState, useEffect } from "react";
import Input from "../components/Input";
import Selector from "../components/Selector";

const Home = ({dataCurrencies}) => {
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
    
  return (
   <div className="flex flex-col justify-center items-center mt-6 px-6 gap-4">
    <div className="w-full">
      <h1 className="text-2xl mb-5">Cambiar divisas a pesos</h1>
      <label>Selecciona una divisa</label>
      <Selector id="select-currency" options={dataCurrencies} handleChange={handleChangeSelector} selectedOption={selectedOption}/>
    </div>
    {
      selectedOption.codigo &&
        <div className="w-full flex flex-col items-center gap-4">
          <div className="text-white bg-blue-900 rounded-lg p-4">
              <p className="text-sm">
                Valor <span className="font-bold">{selectedOption.nombre}</span> a la fecha de
                 <span className="font-bold"> {new Date(selectedOption.fecha).toLocaleDateString('es-es', {year:"numeric", month:"short", day:"numeric"}) }</span> es de 
                 <span className="font-bold"> {selectedOption.valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span> pesos.
              </p>
          </div>
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