
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from "./Components/Header";
import Countryformpage from "./Pages/countryformpage";
import CountryListpage from "./Pages/countryListpage";
import CountryEditformpage from "./Pages/countryEditformpage";
import CityListpage from "./Pages/cityListpage";
import Cityformpage from "./Pages/cityformpage";
import StateListpage from "./Pages/stateListpage";
import Stateformpage from "./Pages/stateformpage";
import StateEditformpage from "./Pages/stateEditformpage";
import CityEditformpage from "./Pages/cityEditformpage";
import Loginpage from './Pages/loginpage';
import Registerpage from './Pages/registerpage';

function App() { 
  
  const location = useLocation();
  const showHeader = !['/'].includes(location.pathname) && !['/registerpage'].includes(location.pathname)

  return (
    <>
      {showHeader && <Header/>}
      <Routes>
        <Route path="/countrypage" element={<CountryListpage />} />
        <Route path="/formpage" element={<Countryformpage />} />
        <Route path="/countryeditformpage/edit/:id" element={<CountryEditformpage />} />
        <Route path="/stateListpage" element={<StateListpage />} />
        <Route path="/stateformpage" element={<Stateformpage />} />
        <Route path="/stateEditformpage/edit/:id" element={<StateEditformpage />} />
        <Route path="/cityformpage" element={<Cityformpage />} />
        <Route path="/cityListpage" element={<CityListpage />} />
        <Route path="/cityEditformpage/edit/:id" element={<CityEditformpage />} />
        <Route path="/" element={<Loginpage />} />
        <Route path="/registerpage" element={<Registerpage/>}/>
      </Routes>
    </>
  );
}

export default App;

