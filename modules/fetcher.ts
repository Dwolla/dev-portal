const fetcher = (a: RequestInfo, b: RequestInit) =>
  fetch(a, b).then((r) => r.json());

export default fetcher;
