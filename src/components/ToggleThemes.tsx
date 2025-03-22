import { useEffect } from "react";

export const ToggleThemes = () => {

  const toggleThemes = (color: string) => {
    const root = document.documentElement.classList;
    
    // Quitar clases existentes
    root.remove("orange", "light");
    
    // Aplicar nueva clase si no es default
    if (color === "orange") {
      root.add("orange");
    } else if (color === "light") {
      root.add("light");
    } else if (color === "default") {
      localStorage.removeItem("theme-color");
    }
    
    // Guardar en localStorage
    localStorage.setItem("theme-color", color);
  };

  // Aplicar tema guardado al cargar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-color");
    if (savedTheme) {
      toggleThemes(savedTheme);
    }
  }, []);

  return (
    <div className="z-60 sm:fixed py-6 sm:py-0 bottom-0 sm:left-0 flex sm:flex-col items-center justify-center gap-1.5 sm:gap-3 sm:mb-4 sm:ms-4">
      <button
        className="cursor-pointer flex p-2 sm:p-2.5 bg-bg-secondary rounded-full"
        onClick={() => toggleThemes("default")}
      >
        <div className="bg-[#095b92] w-3 sm:w-4 h-5 sm:h-7 rounded-l-full"></div>
        <div className="bg-[#1b1b1b] w-3 sm:w-4 h-5 sm:h-7 rounded-r-full"></div>
      </button>
      <button
        className="cursor-pointer flex p-2 sm:p-2.5 bg-bg-secondary rounded-full"
        onClick={() => toggleThemes("orange")}
      >
        <div className="bg-[#c06c46] w-3 sm:w-4 h-5 sm:h-7 rounded-l-full"></div>
        <div className="bg-[#1b1b1b] w-3 sm:w-4 h-5 sm:h-7 rounded-r-full"></div>
      </button>
      <button
        className="cursor-pointer flex p-2 sm:p-2.5 bg-bg-secondary rounded-full"
        onClick={() => toggleThemes("light")}
      >
        <div className="bg-[#095b92] w-3 sm:w-4 h-5 sm:h-7 rounded-l-full"></div>
        <div className="bg-[#c9c9c9] w-3 sm:w-4 h-5 sm:h-7 rounded-r-full"></div>
      </button>
    </div>
  );
};
