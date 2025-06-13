import { useParams } from 'next/navigation';

export default function PhotoDetail() {
    const { id } = useParams();

    return (
        <div>
            {/* <h2 className="text-2xl font-bold mb-4">Photo #{id}</h2>
            <img src={`/images/photo${id}.jpg`} alt={`Photo ${id}`} className="rounded-lg max-w-full mx-auto" /> */}
        </div>
    );
}
