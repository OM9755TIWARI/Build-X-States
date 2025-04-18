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
   
   const countryUrl = "https://crio-location-selector.onrender.com/countries";

   const fetchCountries = async() => {
    try{
            const response = await axios.get(countryUrl); 
            setCountries(response.data);
        }
        catch(error){
            console.log('there is some fatching error : ', error);
        }
   }
   useEffect(() =>{
    fetchCountries();
   }, []);

   const fetchState = async() => {
    if(selectedCountries){
        try{
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/states`);

        setState(response.data); 
        setCities([]); // clear cities
        setSelectedState('');
        }
        catch(error){
            console.log("there is some fatching error : ", error);
        }
    }
   }
   useEffect(() => {
    fetchState();
   }, [selectedCountries]);

   const fetchCity = async() => {
    if(selectedState){
        try{
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedState}/cities`);
            setCities(response.data);
        }
        catch(error){
            console.log('there is csome fatching error : ', error);
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

      {selectedCountries && selectedState && selectedCities && (
        
        <h1>
        You selected <strong style={{ color: "black" }}>{selectedCities},</strong>{" "}
        <span style={{ color: "gray" }}>{selectedState}, {selectedCountries}</span>
        </h1>
      )

      }
        </div>
    )
}
export default Countries;