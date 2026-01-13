import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;`;
  return data;
}

export async function GET() {
  try {
    // Llamamos a la función y devolvemos el resultado como JSON
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    // Si hay un error (como el error 26000 que vimos antes), lo capturamos aquí
    return Response.json({ error }, { status: 500 });
  }
}
