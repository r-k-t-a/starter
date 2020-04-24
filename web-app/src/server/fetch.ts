import unfetch from 'isomorphic-unfetch';
import { AnyAction } from 'redux';

export async function fetch(route: string, payload: {}): Promise<AnyAction> {
  const endpoint = `${process.env.LOGUX_FALLBACK_URL}${route}`;
  const options = {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };
  const results = await unfetch(endpoint, options);
  const data = await results.json();
  return data;
}
