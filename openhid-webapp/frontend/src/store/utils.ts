import 'isomorphic-fetch';

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}

export const transport = (api: string, body: Object) =>
  fetch(api, {
    method: 'post',
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.error);
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}
