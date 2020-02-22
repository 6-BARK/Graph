import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '300s',
};

// Read operations testing
export default function () {
  const id = Math.round(Math.random() * 10000000);
  const res = http.get(`http://localhost:3003/properties/${id}`);
  check(res, {
    "status was 200": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
  sleep(1);
};

// Write operations testing
// export default function () {
//   const payload = {
//     name: '123 oMalley',
//     z: '45',
//     estimatedRangeMin: '42',
//     estimatedRangeMax: '47',
//     userId: '14',
//     cityId: '19',
//     neighborhoodId: '3',
//     prices: '123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123',
//   };
//   const params = { headers: { 'Content-Type': 'application/json' } };
//   const rand = Math.floor(Math.random() * 100);
//   if (rand === 1) {
//     const postRes = http.post('http://localhost:3003/properties/', JSON.stringify(payload), params);
//     check(postRes, {
//       "status was 200": (r) => r.status === 200,
//       "transaction time OK": (r) => r.timings.duration < 200
//     });
//   }
//   sleep(1);
// }
