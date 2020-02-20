import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 75,
  duration: "10s"
};


export default function() {
  const id = Math.round(Math.random() * 10000000);
  http.get(`http://localhost:3003/properties/${id}`);
  sleep(1);
};
