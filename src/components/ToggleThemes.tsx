export const ToggleThemes = () => {
  const toggleThemes = (color:string) => {
    const root = document.documentElement.classList
    switch (color) {
      case "orange":
        root.add("orange")
        root.remove("light")
        break;
      case "light":
        root.add("light")
        root.remove("orange")
        break;
      default:
        root.remove("orange")
        root.remove("light")
        break;
    }
  }
  
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
