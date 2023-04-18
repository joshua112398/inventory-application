import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage({ group }) {
  // Get the id from the URL
  let { id } = useParams();
  const [detail, setDetail] = useState('');

  // Fetch data based on id and collection indicated by the group prop
  useEffect(() => {
    async function startFetching() {
      const fetchedDetail = await fetch(
        `http://localhost:3000/api/${group}/${id}`
      );
      const jsonDetail = await fetchedDetail.json();
      setDetail(jsonDetail);
    }

    startFetching();
  }, []);

  /* If detail state is empty, render null. Otherwise render details.
  Different renders based on what group the requested detail is in */
  if (detail === '') {
    return null;
  } else if (group === 'characters') {
    return (
      <div className="flex flex-wrap gap-5 p-4 text-white">
        <p>{detail.name}</p>
        <p>{detail.title}</p>
        <p>{detail.vision.name}</p>
        <p>{detail.rating}</p>
        <p>{detail.amount}</p>
      </div>
    );
  } else if (group === 'weapons') {
    return (
      <div className="flex flex-wrap gap-5 p-4 text-white">
        <p>{detail.name}</p>
        <p>{detail.description}</p>
      </div>
    );
  } else if (group === 'visions') {
    return (
      <div className="flex flex-wrap gap-5 p-4 text-white">
        <p>{detail.name}</p>
      </div>
    );
  }
}

export default DetailPage;
