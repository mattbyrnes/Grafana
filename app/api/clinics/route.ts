import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const result = await query(
      "SELECT id, user_id, name, city, region, address, phone, website, description, price_range as priceRange, hours, services, image, created_at FROM user_clinics WHERE status = 'approved' ORDER BY created_at DESC"
    );

    const clinics = result.rows.map((row) => ({
      ...row,
      services: typeof row.services === "string" ? JSON.parse(row.services) : row.services,
    }));

    return Response.json(clinics);
  } catch (error) {
    console.error("Get all clinics error:", error);
    return Response.json(
      { error: "Failed to fetch clinics" },
      { status: 500 }
    );
  }
}
