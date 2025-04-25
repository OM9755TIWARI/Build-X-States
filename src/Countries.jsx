import React from "react";
import '../src/Countries.css';
import { useState, useEffect } from "react";
import axios from 'axios';

const Countries = () =>{
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState([]);
    const [cities, setCities] = useState([]);

   const [selectedState, setSelectedState] = useState('');
   const [selectedCountries, setSelectedCountries] = useState("");
   const [selectedCities, setSelectedCities] = useState("");
   const [loading, setLoading] = useState({countries : false, state : false, cities : false,});
   
   const countryUrl = "https://crio-location-selector.onrender.com/countries";

   const fetchCountries = async() => {
    setLoading((prev) => ({...prev, countries: true }));
    try{
            const response = await axios.get(countryUrl); 
            setCountries(response.data);
        }
        catch(error){
            console.log('there is some fatching error : ', error);
        }
        finally {
            setLoading((prev) => ({ ...prev, countries: false }));
          }
   }
   useEffect(() =>{
    fetchCountries();
   }, []);

   const fetchState = async() => {
    if(selectedCountries){
        setLoading((prev) => ({...prev, state : true}));
        try{
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/states`);

        setState(response.data); 
        setCities([]); // clear cities
        setSelectedState('');
        }
        catch(error){
            console.log("there is some fatching error : ", error);
        }
        finally{
            setLoading((prev) => ({...prev, state : false}))
        }
    }
   }
   useEffect(() => {
    fetchState();
   }, [selectedCountries]);

   const fetchCity = async() => {
    if(selectedState){
        setLoading((prev) => ({...prev, cities : true}))
        try{
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedState}/cities`);
            setCities(response.data);
        }
        catch(error){
            console.log('there is some fatching error : ', error);
        }
        finally{
            setLoading((prev) => ({...prev, cities : false}))
        }
    }
   }
   useEffect(() => {
    fetchCity();
   }, [selectedState]);

    return (
        <div>
            <h1> Select Location </h1>
            <select value = {selectedCountries} onChange={(e) => setSelectedCountries(e.target.value)} className = "country" name="Country" placeholder="country Name" id="country">
                <option>Select Country</option>
                    {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                    ))}
            </select>

            <select value ={selectedState} onChange = {(e) => setSelectedState(e.target.value)} className = "country" name="state" id="state" disabled={!selectedCountries}><option >Select State</option>
                {state.map(s => (
                <option key={s} value={s}>{s}</option>
                ))}
            </select>


            <select className="country" value = {selectedCities} onChange = {(e) => setSelectedCities(e.target.value)} disabled={!selectedState}>
        <option >Select City</option>
        {cities.map(ci => (
          <option key={ci} value={ci}>{ci}</option>
        ))}
      </select>


      <div>
         {loading.countries && <p>Loading Countries...</p>}
         {!loading.countries && countries.length === 0 && (<p> Failed to load countries.please try again later </p>)}

         {loading.state && <p>Loading States...</p>}
         {!loading.state && state.length === 0 && selectedCountries && (<p> Failed to load states.please try again later </p>)}

         {loading.cities && <p>Loading Cities...</p>}
         {loading.cities && cities.length === 0 && selectedCountries && selectedState && (<p> Failed to load cities.please try again later </p>) }
      </div>

      {
        selectedCities && (<div><h1>You Selected <span>{selectedCities}</span>, <span>{" "}{selectedState}, {selectedCountries}</span></h1></div>)
      }  
      
    </div>
    )
}
export default Countries;