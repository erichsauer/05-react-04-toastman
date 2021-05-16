export default async function ({ url, method, body, header, key }) {
  const expectBody = method[0] === 'P';
  const res = await fetch(url, {
    method,
    [expectBody ? 'headers' : null]: {
      'Content-Type': 'application/json',
      [header ? header : null]: key ? key : null,
    },
    [expectBody ? body : null]: [expectBody ? body : null],
  });
  return await res.json();
}
