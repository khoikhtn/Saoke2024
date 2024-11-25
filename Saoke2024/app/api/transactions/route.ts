import { createConnection } from "@/app/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const url = new URL(req.url);
  const amountRange = url.searchParams.get('amount_range');
  const searchDetail = url.searchParams.get('search_detail');
  const minAmount = url.searchParams.get('min_amount');
  const maxAmount = url.searchParams.get('max_amount');

  // Cache key
  const cacheKey = `transactions:${amountRange}:${searchDetail || ''}:${minAmount || ''}:${maxAmount || ''}`;

  try {

  // If not cached, fetch data from the database
    let sql = "SELECT * FROM temp";
    const conditions: string[] = [];

    // Handle amount range filtering
    if (amountRange === '1') {
      conditions.push("amount BETWEEN 0 AND 100000");
    } else if (amountRange === '2') {
      conditions.push("amount BETWEEN 100000 AND 500000");
    } else if (amountRange === '3') {
      conditions.push("amount BETWEEN 500000 AND 1000000");
    } else if (amountRange === '4') {
      conditions.push("amount BETWEEN 1000000 AND 5000000");
    } else if (amountRange === '5') {
      conditions.push("amount BETWEEN 5000000 AND 10000000");
    } else if (amountRange === '6') {
      conditions.push("amount BETWEEN 10000000 AND 50000000");
    } else if (amountRange === '7') {
      conditions.push("amount > 50000000");
    }

    // Handle custom min/max amount filtering
    if (minAmount && maxAmount) {
      conditions.push(`amount BETWEEN ${minAmount} AND ${maxAmount}`);
    } else if (minAmount) {
      conditions.push(`amount >= ${minAmount}`);
    } else if (maxAmount) {
      conditions.push(`amount <= ${maxAmount}`);
    }

    // Handle detail search filtering
    if (searchDetail) {
      conditions.push(`detail LIKE '%${searchDetail}%'`);
    }

    // Add conditions to the SQL query
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    const db = await createConnection();
    const [transactions] = await db.query(sql);

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await createConnection();
    const { date, code, amount, detail } = await req.json();

    if (!date || !code || !amount || !detail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sql = "INSERT INTO temp (date, code, amount, detail) VALUES (?, ?, ?, ?)";
    const result = await db.query(sql, [date, code, amount, detail]);

    return NextResponse.json({ message: "Data added successfully", result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db = await createConnection();
    const { code, date, amount, detail } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code field is required" }, { status: 400 });
    }

    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    // Build dynamic SQL based on the fields provided
    if (date) {
      fieldsToUpdate.push("date = ?");
      values.push(date);
    }

    if (amount) {
      fieldsToUpdate.push("amount = ?");
      values.push(amount);
    }

    if (detail) {
      fieldsToUpdate.push("detail = ?");
      values.push(detail);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const sql = `UPDATE temp SET ${fieldsToUpdate.join(", ")} WHERE code = ?`;
    values.push(code);  // Append the code to the query parameters

    const result = await db.query(sql, values);

    return NextResponse.json({ message: "Data updated successfully", result });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
