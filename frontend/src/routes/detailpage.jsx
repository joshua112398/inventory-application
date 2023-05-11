import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeletePopup from '../components/deletepopup';

function DetailPage({ group }) {
  // Get the id from the URL
  let { id } = useParams();
  const [detail, setDetail] = useState('');
  const [currentGroup, setCurrentGroup] = useState(group);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Fetch data based on id and collection indicated by the group prop
  useEffect(() => {
    async function startFetching() {
      const fetchedDetail = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${group}/${id}`
      );
      const jsonDetail = await fetchedDetail.json();
      setDetail(jsonDetail);
      setCurrentGroup(group);
    }
    startFetching();
  }, [group, id]);

  /* If detail state is empty, render null. Otherwise render details.
  Different renders based on what group the requested detail is in */
  function renderDetail(currentGroup) {
    if (detail === '') {
      return null;
    } else if (currentGroup === 'characters') {
      return (
        <div className="flex flex-wrap gap-5 p-4 text-white">
          <img src={detail.img} />
          <p>{detail.name}</p>
          <p>{detail.title}</p>
          <p>{detail.vision.name}</p>
          <p>{detail.rating}</p>
          <p>{detail.amount}</p>
        </div>
      );
    } else if (currentGroup === 'weapons') {
      return (
        <div className="flex flex-wrap gap-5 p-4 text-white">
          <p>{detail.name}</p>
          <p>{detail.description}</p>
        </div>
      );
    } else if (currentGroup === 'visions') {
      return (
        <div className="flex flex-wrap gap-5 p-4 text-white">
          <p>{detail.name}</p>
        </div>
      );
    } else if (currentGroup === 'roles') {
      return (
        <div className="flex flex-wrap gap-5 p-4 text-white">
          <p>{detail.name}</p>
        </div>
      );
    } else {
      return null;
    }
  }

  function toggleDeletePopup() {
    setShowDeletePopup((showDeletePopup) => !showDeletePopup);
  }

  return (
    <>
      {renderDetail(currentGroup)}
      <button className="text-rose-600 p-4" onClick={toggleDeletePopup}>
        Delete
      </button>
      <DeletePopup
        visible={showDeletePopup}
        toggleVisibility={toggleDeletePopup}
        group={group}
        name={detail.name}
        id={id}
      />
    </>
  );
}

export default DetailPage;
