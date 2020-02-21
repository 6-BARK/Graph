import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "300s"
};


export default function() {
  const id = Math.round(Math.random() * 10000000);
  http.get(`http://localhost:3003/properties/${id}`);
  sleep(0.1);
};
