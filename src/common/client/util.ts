export async function post<T = any>(url: string, body: any) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status >= 400) {
    throw new Error(`HTTP ERRROR: ${response.status}: ${await response.text()}`);
  }

  return response.json();
}
