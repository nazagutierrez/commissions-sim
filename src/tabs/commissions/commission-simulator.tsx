import React, { useState } from "react"
import { useCommissionsContext } from "../../context/commissionsContext";
import { calculateCommission } from "../../utils/calculateCommissions";
import { FormInput } from "../../components/FormInput";
import { SupportAgentHome } from "../../components/SupportAgentHome";

export default function CommissionSimulator() {
  const { setCommissionsData, setGoalData, setProspectData, setUpdateFlag} = useCommissionsContext(); 
  const [commission, setCommission] = useState("");
  const [customCommission, setCustomCommission] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Revisamos que tipo de comision (custom o con select) y seteamos el valor
    setCommission(e.target.value);
    if (e.target.value !== "other") {
      setCustomCommission("");
    }
  };

  // Función que devuelve el producto a partir del valor
  const ckeckProduct = (prodValue: number) => {
    if (prodValue === 700000) {
      return "Product A"
    } else if (prodValue === 900000) {
      return "Product B"
    } else if (prodValue === 1100000) {
      return "Product C"
    } else if (prodValue === 1300000) {
      return "Product D"
    } else if (prodValue === 1500000) {
      return "Product E"
    } else if (prodValue === 1700000) {
      return "Product F"
    } else if (prodValue === 1900000) {
      return "Product G"
    } else if (prodValue === 2100000) {
      return "Product H"
    } else {
      return "Product"
    }
  }


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Obtenemos los valores del formulario
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const { name, month, productValue , commission, usdValue, usdTicket, profitGoal, conversionRate } = values;
    
    // Verificamos que todos los valores sean correctos
    if (
      typeof name === "string" &&
      typeof month === "string" &&
      typeof Number(productValue) === "number" &&
      typeof Number(commission) === "number" &&
      typeof Number(usdValue) === "number" &&
      typeof Number(usdTicket) === "number" &&
      typeof conversionRate === "string"
    ) {
      let numCommission = 0
      const numUsdValue = Number(usdValue)
      const numUsdTicket = Number(usdTicket)
      const numProductValue = Number(productValue)
      
      // Si es other seteamos en custom, si no el select
      if (commission === "other") {
        numCommission = Number(customCommission)
      } else {
        numCommission = Number(commission)
      }

      // Creamos el objeto con los datos nuevos
      const updatedCommissionsData = {
        name,
        month,
        product: ckeckProduct(numProductValue),
        productValue: numProductValue,
        commission: numCommission,
        usdValue: numUsdValue,
        usdTicket: numUsdTicket,
        conversionRate: conversionRate,
      }

      // Calculamos la comision y seteamos los datos
      const updatedProfitGoal = Number(profitGoal)
      calculateCommission({updatedProfitGoal, updatedCommissionsData, setGoalData, setProspectData, setCommissionsData, setUpdateFlag})
    }
  }
  

  return (
    <div className="flex-col-reverse xl:flex-row flex w-full justify-center items-center gap-14 xl:gap-32 h-full py-[50.5px]">
      <form onSubmit={onSubmit} className="space-y-6 my-5 xl:w-1/3 flex flex-col items-center justify-center w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <FormInput text="Ingresa tu nombre" label="Nombre de Socio/a" name="name" type="text" placeholder="Ingresa tu nombre" />
          <FormInput text="Ingresa el mes" label="Mes" name="month" type="text" placeholder="Ingresa el mes" />
          <FormInput text="Ingresa el ticket promedio en USD" label="Mi ticket promedio en USD" name="usdTicket" type="number" placeholder="1100" />
          <FormInput text="Valor del USD del día" label="Valor USD" name="usdValue" type="number" placeholder="1055" />
          <FormInput text="Ganancia en pesos esperada" label="Cuanto quiero ganar?" name="profitGoal" type="number" placeholder="1200000" />
          <FormInput text="Tasa de cierre" label="Tasa de clientes cerrados" name="conversionRate" type="text" placeholder="0.30" />
          <div>
            <div className={`${commission === "other" ? "hidden" : ""}`}>
              <label className="block text-sm font-medium text-main-white mb-1">
                Comisión actual
              </label>
              <select
                required
                className="w-full px-3 py-2 bg-bg-secondary border border-bg-secondary rounded-md text-main-white focus:outline-none focus:border-b-primary transition-colors"
                name="commission"
                value={commission}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Comisión
                </option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
                <option value="other">Otra</option>
              </select>
              <p className="mt-1 text-xs text-main-gray">Comisión para el producto actual</p>
            </div>

            {commission === "other" && (
              <div>
                <label className="block text-sm font-medium text-main-white mb-1">
                  Comisión personalizada
                </label>
                <input
                  name="customCommission"
                  type="number"
                  value={customCommission}
                  onChange={(e) => setCustomCommission(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-secondary border border-bg-secondary rounded-md text-main-white focus:outline-none focus:border-b-primary transition-colors"
                  placeholder="Ej: 12"
                />
                <p className="mt-1 text-xs text-main-gray">Comisión personalizada</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-main-white mb-1">Producto</label>
            <select
              required
              className="w-full px-3 py-2 bg-bg-secondary border border-bg-secondary rounded-md text-main-white focus:outline-none focus:border-b-primary transition-colors"
              name="productValue"
            >
              <option value="" selected disabled>Productos</option>
              <option value={700000}>Producto A</option>
              <option value={900000}>Producto B</option>
              <option value={1100000}>Producto C</option>
              <option value={1300000}>Producto D</option>
              <option value={1500000}>Producto E</option>
              <option value={1700000}>Producto F</option>
              <option value={1900000}>Producto G</option>
              <option value={2100000}>Producto H</option>
            </select>
            <p className="mt-1 text-xs text-main-gray">Producto para simular la comisión</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary hover:opacity-80 text-main-white font-medium rounded-md transition-opacity focus:outline-none cursor-pointer"
        >
          Calcular comisión
        </button>
      </form>
      <SupportAgentHome />
    </div>
  )
}

