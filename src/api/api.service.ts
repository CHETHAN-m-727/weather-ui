import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "Utils/constant";

export const tempApi = (cityName: string) => {
  console.log("BASE_URL", BASE_URL);
  const url = `${BASE_URL}/Weather?cityName=${cityName}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        reject(error.response.data);
      });
  });
};

export const tempWithlotAndLanApi = (reqBody: any) => {
  console.log("BASE_URL", BASE_URL);
  const url = `${BASE_URL}/WeatherByLonAndLat?Latitude=${reqBody.latitude}&Longitude=${reqBody.longitude}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error(error);
        reject(error.response.data);
      });
  });
};
