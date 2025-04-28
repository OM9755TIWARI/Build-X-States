// import React from "react";
// import '../src/Countries.css';
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const Countries = () =>{
//     const [countries, setCountries] = useState([]);
//     const [state, setState] = useState([]);
//     const [cities, setCities] = useState([]);

//    const [selectedState, setSelectedState] = useState('');
//    const [selectedCountries, setSelectedCountries] = useState("");
//    const [selectedCities, setSelectedCities] = useState("");
//    const [loading, setLoading] = useState({countries : false, state : false, cities : false,});
   
//    const countryUrl = "https://crio-location-selector.onrender.com/countries";

//    const fetchCountries = async() => {
//     setLoading((prev) => ({...prev, countries: true }));
//     try{
//             const response = await axios.get(countryUrl); 
//             setCountries(response.data);
//         }
//         catch(error){
//             console.log('there is some fatching error : ', error);
//         }
//         finally {
//             setLoading((prev) => ({ ...prev, countries: false }));
//           }
//    }
//    useEffect(() =>{
//     fetchCountries();
//    }, []);

//    const fetchState = async() => {
//     if(selectedCountries){
//         setLoading((prev) => ({...prev, state : true}));
//         try{
//         const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/states`);

//         setState(response.data); 
//         setCities([]); // clear cities
//         setSelectedState('');
//         }
//         catch(error){
//             console.log("there is some fatching error : ", error);
//         }
//         finally{
//             setLoading((prev) => ({...prev, state : false}))
//         }
//     }
//    }
//    useEffect(() => {
//     fetchState();
//    }, [selectedCountries]);

//    const fetchCity = async() => {
//     if(selectedState){
//         setLoading((prev) => ({...prev, cities : true}))
//         try{
//             const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedState}/cities`);
//             setCities(response.data);
//         }
//         catch(error){
//             console.log('there is some fatching error : ', error);
//         }
//         finally{
//             setLoading((prev) => ({...prev, cities : false}))
//         }
//     }
//    }
//    useEffect(() => {
//     fetchCity();
//    }, [selectedState]);

//     return (
//         <div>
//             <h1> Select Location </h1>
//             <select value = {selectedCountries} onChange={(e) => setSelectedCountries(e.target.value)} className = "country" name="Country" placeholder="country Name" id="country">
//                 <option>Select Country</option>
//                     {countries.map(c => (
//                     <option key={c} value={c}>{c}</option>
//                     ))}
//             </select>

//             <select value ={selectedState} onChange = {(e) => setSelectedState(e.target.value)} className = "country" name="state" id="state" disabled={!selectedCountries}><option >Select State</option>
//                 {state.map(s => (
//                 <option key={s} value={s}>{s}</option>
//                 ))}
//             </select>


//             <select className="country" value = {selectedCities} onChange = {(e) => setSelectedCities(e.target.value)} disabled={!selectedState}>
//         <option >Select City</option>
//         {cities.map(ci => (
//           <option key={ci} value={ci}>{ci}</option>
//         ))}
//       </select>


//       <div>
//          {loading.countries && <p>Loading Countries...</p>}
//          {!loading.countries && countries.length === 0 && (<p> Failed to load countries.please try again later </p>)}

//          {loading.state && <p>Loading States...</p>}
//          {!loading.state && state.length === 0 && selectedCountries && (<p> Failed to load states.please try again later </p>)}

//          {loading.cities && <p>Loading Cities...</p>}
//          {loading.cities && cities.length === 0 && selectedCountries && selectedState && (<p> Failed to load cities.please try again later </p>) }
//       </div>

//       {
//         selectedCities && (<div><h1>You Selected <span>{selectedCities}</span>, <span>{" "}{selectedState}, {selectedCountries}</span></h1></div>)
//       }  
      
//     </div>
//     )
// }
// export default Countries;





import React from "react";
import '../src/Countries.css';
import { useState, useEffect } from "react";
import axios from 'axios';


// base URL
const BASE_API_URL = "https://crio-location-selector.onrender.com";

// https://crio-location-selector.onrender.com/country=India/state=Maharashtra/cities

const Countries = () => {
  // functions to manage the state of countries array
  const [countries, setCountries] = useState([]);
  // functions to manage the selection of countries
  const [selectedCountry, setSelectedCountry] = useState("");

  // functions to manage the array of states
  const [states, setStates] = useState([]);
  // functions to manage the selection of states
  const [selectedState, setSelectedState] = useState("");

  // functions to manage the array of cities
  const [cities, setCities] = useState([]);
  // functions to manage the selection of city
  const [selectedCity, setSelectedCity] = useState("");

  const [loading, setLoading] = useState({
    countries: false,
    states: false,
    cities: false,
  });

  // useEffect hook to fetch the countries array
  useEffect(() => {
    // function to fetch the countries
    async function fetchCountries() {
      setLoading((prev) => ({ ...prev, countries: true }));
      try {
        let response = await fetch(`${BASE_API_URL}/countries`);

        const countriesJson = await response.json();

        //console.log(countriesJson);
        setCountries(countriesJson);
        console.log(countriesJson);
      } catch (error) {
        console.log("Error fetching data");
        setCountries([]);
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    }

    fetchCountries();
  }, []);

  //useEffect to fetch the states
  useEffect(() => {
    // function to get the array of states
    if (selectedCountry) {
      async function fetchStates() {
        setLoading((prev) => ({ ...prev, states: true }));
        try {
          let response = await fetch(
            `${BASE_API_URL}/country=${selectedCountry}/states`
          );

          let statesJson = await response.json();
          setStates(statesJson);
        } catch (error) {
          console.log("Error fetching states");
          setStates([]);
        } finally {
          setLoading((prev) => ({ ...prev, states: false }));
        }
      }

      fetchStates();
    }
  }, [selectedCountry]);

  // useEffect hook for cities
  useEffect(() => {
    if (selectedCountry && selectedState) {
      async function fetchCities() {
        setLoading((prev) => ({ ...prev, cities: true }));
        try {
          let response = await fetch(
            `${BASE_API_URL}/country=${selectedCountry}/state=${selectedState}/cities`
          );

          let citiesJson = await response.json();
          //console.log(citiesJson);

          if (Array.isArray(citiesJson)) {
            setCities(citiesJson);
          } else {
            console.log("Invalid data received for cities");
            setCities([]);
          }
        } catch (error) {
          console.log("Error fetching cities");
          setCities([]);
        } finally {
          setLoading((prev) => ({ ...prev, cities: false }));
        }
      }

      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      <h1>Select Location</h1>
      <div className="location-form-div">
        <form className="location-form">
          {/* country select */}
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setStates([]);
              setSelectedState("");
              setCities([]);
              setSelectedCity("");
            }}
            className="dropdown"
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

                {/* state select */}
                <select
                value={selectedState}
                onChange={(e) => {
                    setSelectedState(e.target.value);
                    setCities([]);
                    setSelectedCity("");
                }}
                className="dropdown"
                disabled={!selectedCountry} 
                >

            <option value="" disabled>
              Select State
            </option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

    {/* city selection */}
    <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    className="dropdown"
    disabled={!selectedState}  // <- added this
    >

            <option value="" disabled>
              Select City
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="location-display">
        {loading.countries && <p>Loading Countries...</p>}
        {!loading.countries && countries.length === 0 && (
          <p className="error">
            Failed to load countries. Please try again later.
          </p>
        )}

        {loading.states && <p>Loading states...</p>}
        {!loading.states && states.length === 0 && selectedCountry && (
          <p className="error">
            Failed to load states. Please try again later.
          </p>
        )}

        {loading.cities && <p>Loading cities...</p>}
        {!loading.cities &&
          cities.length === 0 &&
          selectedCountry &&
          selectedState && (
            <p className="error">
              Failed to load cities. Please try again later.
            </p>
          )}
      </div>
      {selectedCity && (
        <div className="text">
          <h1 className="result">
            You selected <span className="highlight">{selectedCity}</span>,
            <span className="fade">
              {" "}
              {selectedState}, {selectedCountry}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Countries;
