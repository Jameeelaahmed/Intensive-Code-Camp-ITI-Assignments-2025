export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'random';

    const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=12`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
        },
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
            status: res.status,
        });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
