import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const metaPath = path.join(uploadDir, "meta.json");
    let meta = [];
    if (fs.existsSync(metaPath)) {
        meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    }
    const images = (!category || category === "all")
        ? meta
        : meta.filter(img => img.category === category);
    return NextResponse.json({ images });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
        return NextResponse.json({ error: "No filename provided" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, filename);
    const metaPath = path.join(uploadDir, "meta.json");

    try {
        // Check if file exists before deleting
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        let meta = [];
        if (fs.existsSync(metaPath)) {
            try {
                meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
            } catch (err) {
                console.error("Error reading meta.json:", err);
                return NextResponse.json({ error: "Invalid meta.json file" }, { status: 500 });
            }
        }

        meta = meta.filter(img => img.url !== `/uploads/${filename}`);
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE error:", err);  // 👈 See error in terminal
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}

