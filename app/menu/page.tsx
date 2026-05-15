import { example } from "@/lib/api/example";

async function fetchData() {
  return await example();
}

export default function Menu() {
  let data: Promise<string>;
  const response = fetchData()
    .then((data) => data)
    .catch((err) => (data = err.message));

  data = response;
  return (
    <div>
      <h1>Menu</h1>
      <h2>Resultado: {data}</h2>
    </div>
  );
}
