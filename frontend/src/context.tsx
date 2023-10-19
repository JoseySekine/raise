import React, { createContext, useState } from "react";

export const LightModeContext = createContext({
  lightMode: true,
  toggleLightMode: () => {},
});

type LightModeProviderProps = {
  lightMode: boolean;
  children: React.ReactNode;
};

// const lightModeCss = {
//   background: "#fff",
// };

// const darkModeCss = {
//   background: "#393e46",
// };

export const LightModeProvider = ({ children }: LightModeProviderProps) => {
  const [lightMode, setLightMode] = useState<boolean>(true);

  const toggleLightMode = () => {
    const body = document.body
    if(lightMode) {
			body.classList.add("dark_theme")
		}else{
			body.classList.remove("dark_theme")
		}

    setLightMode(!lightMode);
  };

  return (
    <LightModeContext.Provider
      value={{
        lightMode,
        toggleLightMode,
      }}
    >
      {children}
    </LightModeContext.Provider>
  );
};
