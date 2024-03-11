import React, { useEffect, useState } from "react";
import "./App.css";
import LoaderScreen from "./components/atoms/loader/loader";
import Navbar from "./components/molecules/navbar/navbar";
import Home from "./page/Home/Home";

const App = () => {
  const [loder, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);

  return (
    <>
      {
        loder
          ? <LoaderScreen />
          : (
            <>
              <Navbar />
              <Home />
            </>
          )
      }
      <div>.</div>
    </>
  );
};

export default App;
