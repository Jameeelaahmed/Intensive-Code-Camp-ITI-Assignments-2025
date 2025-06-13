
import Landing from "@/components/Landing/Landing";

async function getData() {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${"Nature"}&per_page=9`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
        },
        cache: 'force-cache'
      }
    );
    const data = await res.json();
    const fetchedImages = data.photos.map((photo) => photo.src.large);
    console.log("Fetched images:", fetchedImages);
    return fetchedImages;
  } catch (err) {
    console.error("Failed to load images", err);
  }

}

export default async function Home() {
  const images = await getData();
  return (
    <Landing images={images} />
  );
}
