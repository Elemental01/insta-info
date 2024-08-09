import { useState } from "react";
import { Contact, Home, Navbar } from "./Sections";

const App = () => {
  const [homeLoaded, setHomeLoaded] = useState(false); // Added state to track if Home has loaded

  const handleHomeLoaded = (isLoaded) => { // Callback to set the state
    setHomeLoaded(isLoaded);
  };

  return (
    <div>
      <Navbar className="" />
      <section className="xl:padding-l wide:padding-r padding-b pt-[100px]">
        <Home onLoad={handleHomeLoaded} /> {/* Pass the callback to Home */}
      </section>
      {homeLoaded && ( // Conditionally render Contact based on homeLoaded state
        <section className="xl:padding-l wide:padding-r padding-b">
          <Contact />
        </section>
      )}
    </div>
  );
}

export default App;
