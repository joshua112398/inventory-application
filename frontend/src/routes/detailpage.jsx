import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
  // Get the id from the URL
  let { id } = useParams();

  useEffect(() => {
    async function startFetching() {
      const fetchedDetail = await fetch(
        'http://localhost:3000/api/characters/' + id
      );
      const detail = await fetchedDetail.json();

      console.log(detail);
    }

    startFetching();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 p-4 text-white">
      <p>{id}</p>
    </div>
  );
}

export default DetailPage;
