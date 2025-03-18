"use client"

import React, { useState } from "react"
import { useCommissionsContext } from "../../context/commissionsContext";
import {  HistoricalData } from "../../types/types";
import supportSvg from "../../assets/support.svg"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export default function CommissionSimulator() {
  const { commissionsData, setCommissionsData} = useCommissionsContext(); 
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const { name, month, product, commission, usdValue, usdTicket } = values;

    if (
      typeof name === "string" &&
      typeof month === "string" &&
      typeof product === "string" &&
      typeof Number(commission) === "number" &&
      typeof Number(usdValue) === "number" &&
      typeof Number(usdTicket) === "number"
    ) {
      const numCommission = Number(commission)
      const numUsdValue = Number(usdValue)
      const numUsdTicket = Number(usdTicket)

      setCommissionsData((prevState) => ({
        ...prevState,
        name,
        month,
        product,
        commission: numCommission,
        usdValue: numUsdValue,
        usdTicket: numUsdTicket,
      }))
    }
    
    // calculateCommission(values)

    const newEntry = {
      month: month,
      sales: commission,
      commission: commission,
    }

    setHistoricalData([...historicalData, newEntry])
  }
  

  return (
    <div className="mb-5 flex w-full justify-center items-center gap-20">
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
            <p className="mt-1 text-xs text-gray-400">Ejemplo</p>
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
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Comisión actual</label>
            <select
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              name="commission"
            >
              <option value="" selected disabled>Comisión</option>
              <option value={10}>10%</option>
              <option value={15}>15%</option>
              <option value={20}>20%</option>
              <option value={25}>25%</option>
              <option value={30}>30%</option>
              <option value="other">Otra</option>
            </select>
            <p className="mt-1 text-xs text-gray-400">Comision para el producto actual</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Producto</label>
            <select
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-b-blue-500"
              name="product"
            >
              <option value="" selected disabled>Productos</option>
              <option value="productoA">Producto A</option>
              <option value="productoB">Producto B</option>
              <option value="productoC">Producto C</option>
              <option value="productoD">Producto D</option>
              <option value="productoE">Producto E</option>
              <option value="productoF">Producto F</option>
            </select>
            <p className="mt-1 text-xs text-gray-400">Producto para simular la comisión</p>
          </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Calcular comisión
        </button>
      </form>

        <div className="flex flex-col items-center justify-center w-1/3 gap-14">
          <div className="flex items-center justify-center gap-8">
            <img src={supportSvg} alt="support svg" className="w-[200px]" />
            <div className="flex flex-col items-start justify-center text-pretty gap-1">
              <h2 className="text-xl">¡Hola!</h2>
              <p className="">Hoy voy a ser tu asistente virtual de comisiones, te dejo el paso a paso y algunos tips para utilizarlo!</p>
            </div>
          </div>
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="h-52 w-72"
          >
            <SwiperSlide className="bg-[#2e0000] rounded-md p-5">Primer paso ingresa tus datos</SwiperSlide>
            <SwiperSlide className="bg-blue-400 rounded-md p-5">Slide 2</SwiperSlide>
            <SwiperSlide className="bg-red-400 rounded-md p-5">Slide 3</SwiperSlide>
            <SwiperSlide className="bg-red-400 rounded-md p-5">Slide 4</SwiperSlide>
          </Swiper>
        </div>
    </div>
  )
}

