import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
  // Get the id from the URL
  let { id } = useParams();
  const [detail, setDetail] = useState('');

  useEffect(() => {
    async function startFetching() {
      const fetchedDetail = await fetch(
        'http://localhost:3000/api/characters/' + id
      );
      const jsonDetail = await fetchedDetail.json();
      setDetail(jsonDetail);
    }

    startFetching();
  }, []);

  // If detail state is empty, render null. Otherwise render details
  if (detail !== '') {
    return (
      <div className="flex flex-wrap gap-5 p-4 text-white">
        <p>{detail.name}</p>
        <p>{detail.title}</p>
        <p>{detail.vision.name}</p>
        <p>{detail.rating}</p>
        <p>{detail.amount}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default DetailPage;
