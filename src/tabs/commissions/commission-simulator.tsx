import React, { useState } from "react"
import { useCommissionsContext } from "../../context/commissionsContext";
import supportSvg from "../../assets/support.svg"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { calculateCommission } from "../../utils/calculateCommissions";

export default function CommissionSimulator() {
  const { commissionsData, goalData, setCommissionsData, setGoalData, setProspectData, setUpdateFlag} = useCommissionsContext(); 
  const [commission, setCommission] = useState("");
  const [customCommission, setCustomCommission] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommission(e.target.value);
    if (e.target.value !== "other") {
      setCustomCommission("");
    }
  };

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
    
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const { name, month, productValue , commission, usdValue, usdTicket, profitGoal, conversionRate } = values;
    
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
      
      if (commission === "other") {
        numCommission = Number(customCommission)
      } else {
        numCommission = Number(commission)
      }

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

      const updatedProfitGoal = Number(profitGoal)
      calculateCommission({goalData, commissionsData, updatedProfitGoal, updatedCommissionsData, setGoalData, setProspectData, setCommissionsData, setUpdateFlag})
    }
  }
  

  return (
    <div className="flex w-full justify-center items-center gap-32 h-[70vh]">
      <form onSubmit={onSubmit} className="space-y-6 my-5 w-1/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre de Socio/a</label>
            <input
              required
              name="name"
              type="text"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              placeholder="Ingresa tu nombre"
            />
            <p className="mt-1 text-xs text-gray-400">Ingresa tu nombre</p>
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Mes</label>
            <input
              required
              name="month"
              type="text"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              placeholder="Ingresa el mes"
            />
            <p className="mt-1 text-xs text-gray-400">Ingresa el mes</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mi ticket promedio en USD</label>
            <input
              required
              name="usdTicket"
              type="number"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              placeholder="1100"
            />
            <p className="mt-1 text-xs text-gray-400">Ingresa el ticket promedio en USD</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Valor USD</label>
            <input
              required
              name="usdValue"
              type="number"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              placeholder="1055"
            />
            <p className="mt-1 text-xs text-gray-400">Valor de cambio</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Cuanto quiero ganar?</label>
            <input
              required
              name="profitGoal"
              type="number"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              placeholder="1200000"
            />
            <p className="mt-1 text-xs text-gray-400">Ganancia en pesos esperada</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tasa de cierre</label>
            <input
              required
              name="conversionRate"
              type="text"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              placeholder="0.30"
            />
            <p className="mt-1 text-xs text-gray-400">Tasa de clientes cerrados</p>
          </div>
          <div>
            <div className={`${commission === "other" ? "hidden" : ""}`}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Comisión actual
              </label>
              <select
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
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
              <p className="mt-1 text-xs text-gray-400">Comisión para el producto actual</p>
            </div>

            {commission === "other" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Comisión personalizada
                </label>
                <input
                  name="customCommission"
                  type="number"
                  value={customCommission}
                  onChange={(e) => setCustomCommission(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
                  placeholder="Ej: 12"
                />
                <p className="mt-1 text-xs text-gray-400">Comisión personalizada</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Producto</label>
            <select
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
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
            <p className="mt-1 text-xs text-gray-400">Producto para simular la comisión</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors focus:outline-none cursor-pointer"
        >
          Calcular comisión
        </button>
      </form>

        <div className="flex flex-col items-center justify-center w-1/3 gap-14">
          <div className="flex items-center justify-center gap-8">
            <img src={supportSvg} alt="support svg" className="w-[200px]" />
            <div className="relative px-4 py-3 flex bg-gray-900 border rounded-md border-gray-700/70 flex-col items-start justify-center text-pretty gap-1">
              <div className="top-4 -left-5 absolute w-[20px] h-[20px] bg-gray-900 border border-r-0 rounded-md border-gray-700/70 rounded-tr-none rounded-br-none" />
              <div className="top-8 -left-9 absolute w-[15px] h-[15px] bg-gray-900 border border-r-0 rounded-md border-gray-700/70" />
              <div className="top-12 -left-12 absolute w-[10px] h-[10px] bg-gray-900 border border-r-0 rounded-md border-gray-700/70" />
              <h2 className="text-xl">¡Hola!</h2>
              <p className="">Hoy voy a ser tu asistente virtual de comisiones/metas, te dejo el paso a paso y algunos tips para utilizarlo!</p>
            </div>
          </div>
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="h-52 w-72"
          >
            <SwiperSlide className="bg-[#2e0000] rounded-md p-5">Primer paso ingresa tus datos ¡deslizá!</SwiperSlide>
            <SwiperSlide className="bg-blue-400 rounded-md p-5">Slide 2</SwiperSlide>
            <SwiperSlide className="bg-red-400 rounded-md p-5">Slide 3</SwiperSlide>
            <SwiperSlide className="bg-red-400 rounded-md p-5">Slide 4</SwiperSlide>
          </Swiper>
        </div>
    </div>
  )
}

