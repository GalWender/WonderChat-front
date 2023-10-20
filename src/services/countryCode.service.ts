import axios from "axios";

export const getCountryPhoneCodes = async (): Promise<{ name: string; code: string }[]> => {
  const response = await axios.get("https://d2chi84je8uj71.cloudfront.net/json/country-codes.json");
  const countries = response.data;
  return countries.map((country: any) => ({
    name: country.code,
    code: country['dial_code'],
    fullname: country.name
  }));
};