export default async function ({ url, method, jsonBody, header, key }) {
  const body = method[0] === 'P' ? jsonBody : null;

  let res;
  if (header && body) {
    res = await fetch(url, {
      method,
      headers: {
        [jsonBody && 'Content-Type']: jsonBody && 'application/json',
        [header]: key,
      },
      body,
    });
  } else if (header) {
    res = await fetch(url, {
      method,
      headers: {
        [header]: key,
      },
      body,
    });
  } else {
    res = await fetch(url, {
      body,
    });
  }

  return { json: await res.json() };
}
