import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../actions/userActions";
import Selector from "./Selector";
import { Country, State, City } from "country-state-city";
import { addUser } from "../services/auth.service";
import toast from "react-hot-toast";

function UserForm() {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[0]);
  const userPayload = useSelector((state) => state.userReducer?.users);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    console.log("state Object=>", JSON.stringify(state));
    console.log("city Object=>", JSON.stringify(city));
    console.log("country Object=>", JSON.stringify(country));
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      state: state.name,
      city: city.name,
      country: country.name,
    });
  };

  const submitForm = async () => {
    console.log("USER DATA SENDING=>", formData);
    await addUser(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createUser(formData));
    // Reset form data here
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      state: "",
      city: "",
      country: "",
      zipCode: "",
    });
    toast.success(addUser.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-600">
            Mobile:
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address1" className="block text-gray-600">
            Address 1:
          </label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address2" className="block text-gray-600">
            Address 2:
          </label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <p className="text-teal-800 font-semibold">Country :</p>
          <Selector
            data={countryData}
            selected={country}
            setSelected={setCountry}
          />
        </div>

        {state && (
          <div className="mb-4">
            <p className="text-teal-800 font-semibold">State :</p>
            <Selector
              data={stateData}
              selected={state}
              setSelected={setState}
            />
          </div>
        )}

        {city && (
          <div className="mb-4">
            <p className="text-teal-800 font-sem ibold">City :</p>
            <Selector data={cityData} selected={city} setSelected={setCity} />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-600">
            Zip Code:
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <button
            // type="submit"
            onClick={() => {
              submitForm();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
