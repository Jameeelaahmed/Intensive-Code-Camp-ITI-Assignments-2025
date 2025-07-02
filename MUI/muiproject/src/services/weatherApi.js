export async function getWeather(city) {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    if (!res.ok) throw new Error('City not found');
    return res.json();
}