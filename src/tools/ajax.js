import axios from "axios";

// ajax = asinchronous js and xml
export const ajax = async (options) => await axios.request(options).then(response => response.data);