import { query } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clinicId = parseInt(id, 10);

    const result = await query(
      "SELECT * FROM user_clinics WHERE id = $1",
      [clinicId]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Clinic not found" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: "Failed to fetch clinic" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clinicId = parseInt(id, 10);
    const body = await request.json();

    const {
      name,
      city,
      region,
      address,
      phone,
      website,
      description,
      priceRange,
      hours,
      services,
      image,
    } = body;

    const result = await query(
      `UPDATE user_clinics
       SET name = $1, city = $2, region = $3, address = $4, phone = $5,
           website = $6, description = $7, price_range = $8, hours = $9,
           services = $10, image = $11
       WHERE id = $12
       RETURNING *`,
      [
        name || "",
        city || "",
        region || "",
        address || "",
        phone || "",
        website || "",
        description || "",
        priceRange || "",
        hours || "",
        JSON.stringify(services || []),
        image || "",
        clinicId,
      ]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Clinic not found" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("Update clinic error:", error);
    return Response.json({ error: "Failed to update clinic" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clinicId = parseInt(id, 10);

    const result = await query(
      "DELETE FROM user_clinics WHERE id = $1 RETURNING id",
      [clinicId]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Clinic not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete clinic error:", error);
    return Response.json(
      { error: "Failed to delete clinic" },
      { status: 500 }
    );
  }
}
