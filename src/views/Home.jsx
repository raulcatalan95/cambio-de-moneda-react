import { useState, useEffect } from "react";
import Input from "../components/Input";
import Selector from "../components/Selector";
import arrowReverse from '../assets/flechasReversas.png';

const Home = ({dataCurrencies}) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [amountCurrency, setAmountCurrency] = useState('');
  const [amountPesos, setAmountPesos] = useState('');
  const [isReverse, setIsReverse] = useState(false);

    const handleChangeSelector = (event) => {
      const selectedCurrency = dataCurrencies.find((item) => event.target.value === item.codigo);
      setSelectedOption(selectedCurrency);
      setAmountCurrency('');
    };

    const toClp = (number) => number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP'});

    const trasnformToPeso = () => {
        if (amountCurrency) {
          const totalPesos = +amountCurrency * selectedOption.valor;
          setAmountPesos(toClp(totalPesos));
        } else {
          setAmountPesos('')
        }
    };

    const trasnformToUf = () => {
        if (amountCurrency) {
          const amount = amountCurrency.replace("$", "").replaceAll(".", "");
          const totalUf = +amount / selectedOption.valor;
          setAmountPesos(totalUf.toFixed(2));
        } else {
          setAmountPesos('')
        }
    };


    const reverseValues = () => {
      setAmountCurrency("");
      setAmountPesos("");
      setIsReverse(!isReverse);
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
                 <span className="font-bold"> { toClp(selectedOption.valor) }</span> pesos.
              </p>
          </div>
          <div className="w-full">
            <label htmlFor="amount">Ingresa monto en {!isReverse ? selectedOption.nombre : "Pesos Chilenos"}</label>
            <Input 
              id="amount"
              amount={amountCurrency}
              setValorInput={setAmountCurrency}
              isChile={isReverse}
              isReverse={isReverse}
              trasnformToUf={trasnformToUf}
              toClp={toClp}
              trasnformToPeso={trasnformToPeso}
            />
          </div>
          <button className="flechasReversas" onClick={reverseValues}>
            <img src={arrowReverse} alt="" />
          </button>
          <div className="w-full">
            <label htmlFor="chile-currency">{!isReverse ? "Pesos Chilenos" : selectedOption.nombre}</label>
            <Input
              id="chile-currency"
              amount={amountPesos}
              setValorInput={setAmountPesos}
              isChile={!isReverse}
              isReverse={isReverse}
              trasnformToUf={trasnformToUf}
              toClp={toClp}
              trasnformToPeso={trasnformToPeso}
            />
          </div>
        </div>
    }
    </div>

  )
}

export default Home