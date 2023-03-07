import { ajax } from "../tools/ajax";

export const getCityWeather = async city => {
    const optionsRequest = {
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        params: {
            q: city,
            appid: "2a84af17c59b525d57b359833fdf8a46",
            units: "metric",  //grados centigrados
        }
    };
    return await ajax(optionsRequest);
}