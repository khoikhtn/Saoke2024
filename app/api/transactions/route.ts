import { createConnection } from "@/app/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const url = new URL(req.url);
  const amountRange = url.searchParams.get('amount_range');

  let sql = "SELECT * FROM transactions";

  if (amountRange === '1') {
    sql += " WHERE amount BETWEEN 0 AND 100000";
  } else if (amountRange === '2') {
    sql += " WHERE amount BETWEEN 100000 AND 500000";
  } else if (amountRange === '3') {
    sql += " WHERE amount BETWEEN 500000 AND 1000000";
  } else if (amountRange === '4') {
    sql += " WHERE amount BETWEEN 1000000 AND 5000000";
  } else if (amountRange === '5') {
    sql += " WHERE amount BETWEEN 5000000 AND 10000000";
  } else if (amountRange === '6') {
    sql += " WHERE amount BETWEEN 10000000 AND 50000000";
  } else if (amountRange === '7') {
    sql += " WHERE amount > 50000000";
  }

  sql += " LIMIT 10";

  try {
    const db = await createConnection()
    const [transactions] = await db.query(sql);
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(error)
  }
}