export default async function ({ url, method, body }) {
  let res;
  if (method === 'GET') {
    res = await fetch(url, {});
  } else {
    res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }
  const json = await res.json();
  return json;
}
