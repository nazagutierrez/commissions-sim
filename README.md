# Simulador de comisiones

## Descripción General

Este es un desafío realizado para un puesto de trabajo en [Sinergia Creativa](https://sinergiacreativa.casa/), es una aplicación para calcular comisiones, datos a prospectar, objetivos de venta, y productos a vender. Estas son las features principales:

## Características Principales

### 1. Vista de ingreso de datos

La primera vista permite ingresar los datos de una manera sencilla y también se puede ver un asistente que da consejos

### 2. Vista de resumen

Luego de ingresar los datos y calcular las comisiónes automaticamente es redirigido a la vista resumen, donde se pueden ver todos los datos ya calculados.

### 3. Vista de gráficos

Además, agregue una vista de graficos, cada simulacion que hagas se guarda en el LocalStorage, de esta manera podes llevar un registro de manera visual.


## Tecnologías
- **Framework**: React, Typescript, CSS.
- **Herramientas**: TailwindCSS para un diseño responsivo y tema oscuro.
- **Visualización de datos**: Recharts para gráficos interactivos.
- **Estado**: ContextAPI + LocalStorage para el manejo del estado.

## Cosas a mejorar

Se le debería agregar un backend y una validación al formulario para aumentar su seguridad, también un sistema de login y admin si es que se quiere, se le podrian cambiar los gráficos para mostrar la información que se quiera.


## Datos

La aplicación trabaja con varios tipos de datos:

### Datos tipados en Typescript
```typescript
export type CommissionsData = {
  conversionRate: string;     // Tasa de cierre
  name: string;               // Nombre
  month: string;              // Mes
  product: string;            // Producto
  productValue: number;       // Valor del producto
  commission: number;         // Porcentaje de comisión
  usdValue: number;           // Valor en USD
  usdTicket: number;          // Ticket promedio en USD
};

export type GoalData = {
  profitGoal:number; // Objetivo a vender
  netProfit: number; // Ganancia neta
  needToSell: number; // Lo que necesito vender
  runVolume: number;  // Volumen en carrera
  monthSales: number;  // Ventas mensuales
};

export type ProspectData = {
  newDataToProspect: number;  // Nuevos datos a prospectar
  minPresentationsMonth: number;  // Mínimo presentaciones por mes
  minPresentationsWeek: number;  // Mínimo presentaciones por semana
};

```
