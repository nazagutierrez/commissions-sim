import supportSvg from "../assets/support.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import dragCursor from "../assets/dragCursor.svg";
import 'swiper/swiper-bundle.css';

export const SupportAgentHome = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 gap-14 text-main-white">
      <div className="flex items-center justify-center gap-8">
        <img src={supportSvg} alt="support svg" className="w-[200px]" />
        <div className="relative px-4 py-3 flex bg-bg-secondary border rounded-md border-primary-border shadow-xl flex-col items-start justify-center text-pretty gap-1">
          <div className="top-4 -left-5 absolute w-[20px] h-[20px] bg-bg-secondary border border-r-0 rounded-md border-primary-border shadow-xl rounded-tr-none rounded-br-none" />
          <div className="top-8 -left-9 absolute w-[15px] h-[15px] bg-bg-secondary border border-r-0 rounded-md border-primary-border shadow-xl" />
          <div className="top-12 -left-12 absolute w-[10px] h-[10px] bg-bg-secondary border border-r-0 rounded-md border-primary-border shadow-xl" />
          <h2 className="text-xl">¡Hola!</h2>
          <p>
            Hoy voy a ser tu asistente virtual de comisiones/metas, antes de empezar,
            te recomiendo leer el paso a paso que te dejo aca abajo.
          </p>
        </div>
      </div>
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="h-52 w-72"
      >
        <SwiperSlide>
          <div className="bg-[radial-gradient(ellipse_60%_100%_at_90%_100%,var(--color-primary)_0%,var(--color-bg-secondary)_50%)] rounded-lg h-full gap-2 text-pretty text-center flex flex-col items-center justify-between p-5">
            <p>Para empezar ingresá tus datos y luego hacé click en calcular comisión.</p>
            <p>Cada input tiene una pequeña ayuda.</p>
            <h2>¡Deslizá!</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[radial-gradient(ellipse_60%_100%_at_90%_100%,#4a29a5_0%,var(--color-bg-secondary)_50%)] rounded-lg h-full text-pretty text-center flex flex-col items-center justify-around p-5">
            <p>Una vez cargado tus datos te redigirá a la sección Resumen.</p>
            <p>Ahi podrás ver tus datos de una manera sencilla.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[radial-gradient(ellipse_60%_100%_at_90%_100%,#1278a0_0%,var(--color-bg-secondary)_50%)] rounded-lg h-full text-pretty text-center flex flex-col items-center justify-around p-5">
            <p>Además, tenes la sección de Gráficos.</p>
            <p>Donde podrás ver tus datos de una forma visual.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" bg-[radial-gradient(ellipse_60%_100%_at_90%_100%,#a18b0e_0%,var(--color-bg-secondary)_50%)] rounded-lg h-full text-pretty text-center flex flex-col items-center justify-around p-5">
            <p>Tus datos se guardan en el LocalStorage.</p>
            <p>Por lo que a medida que agregues simulaciones se irán guardando y mostrando en la sección Gráficos.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[radial-gradient(ellipse_60%_100%_at_90%_100%,#ad434c_0%,var(--color-bg-secondary)_50%)] rounded-lg h-full text-pretty text-center flex flex-col items-center justify-around p-5">
            <p>Y Listo!</p>
            <p>Puedes empezar a probar la aplicación.</p>
            <p>¡Espero que te guste!</p>
          </div>
        </SwiperSlide>
        <img className="opacity-65 w-6 justify-self-center mt-2 animate-drag-cursor" src={dragCursor} />
      </Swiper>
    </div>
  );
};
