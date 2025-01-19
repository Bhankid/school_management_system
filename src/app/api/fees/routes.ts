import { NextResponse } from "next/server";
import StudentFee from "@/models/StudentFee";
import { Op } from "sequelize";

// Retrieve Fees
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "";
  const studentClass = searchParams.get("class") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 13;

  const offset = (page - 1) * limit;

  interface FeeFilters {
    [key: string]: { [Op.like]: string } | string | undefined;
    name?: { [Op.like]: string };
    class?: string;
    status?: string;
  }
  
  const filters: FeeFilters = {};
  if (name) filters.name = { [Op.like]: `%${name}%` };
  if (studentClass) filters.class = studentClass;
  if (status) filters.status = status;

  try {
    const { rows, count } = await StudentFee.findAndCountAll({
      where: filters,
      offset,
      limit,
    });
    return NextResponse.json({
      data: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: `Error fetching data: ${errorMessage}` }, { status: 500 });
  }
}

// Insert Fees
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, gender, class: studentClass, amount, status, email, phone, dueDate } = body;

    const fee = await StudentFee.create({
      name,
      gender,
      class: studentClass,
      amount,
      status,
      email,
      phone,
      dueDate,
    });

    return NextResponse.json(fee, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: `Error inserting data: ${errorMessage}` }, { status: 500 });
  }
}
