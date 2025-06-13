import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
    const data = await request.formData();
    const file = data.get("file");
    const category = data.get("category");
    if (!file || !category) {
        return NextResponse.json({ error: "Missing file or category" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    // Save metadata
    const metaPath = path.join(uploadDir, "meta.json");
    let meta = [];
    if (fs.existsSync(metaPath)) {
        meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    }
    meta.push({ url: `/uploads/${filename}`, category });
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));

    return NextResponse.json({ url: `/uploads/${filename}` });
}