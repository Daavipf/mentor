import { example } from "@/lib/api/example";

async function fetchData() {
  return await example();
}

export default function Menu() {
  const data = fetchData().catch;
  return (
    <div>
      <h1>Menu</h1>
      <h2>Resultado: {data}</h2>
    </div>
  );
}
