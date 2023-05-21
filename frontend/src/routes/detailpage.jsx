import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeletePopup from '../components/deletepopup';
import Form from '../components/form';

function DetailPage({ group }) {
  // Get the id from the URL
  let { id } = useParams();
  const [detail, setDetail] = useState('');
  const [currentGroup, setCurrentGroup] = useState(group);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [lastFormResponse, setLastFormResponse] = useState('');

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
  }, [group, id, lastFormResponse]);

  /* If detail state is empty, render null. Otherwise render details.
  Different renders based on what group the requested detail is in */
  function renderDetail(currentGroup) {
    if (detail === '') {
      return null;
    } else if (currentGroup === 'characters') {
      return (
        <div className="flex flex-wrap flex-col items-center gap-5 p-4 text-white">
          <img className="shrink block max-w-2xl w-full" src={detail.img} />
          <h1 className="text-6xl text-center font-bold">{detail.name}</h1>
          <h2 className="text-3xl">{detail.title}</h2>
          <p
            className="text-3xl border-2 rounded-xl py-1 px-3"
            style={{
              color: `${detail.vision.color}`,
              borderColor: `${detail.vision.color}`,
            }}
          >
            {detail.vision.name}
          </p>
          <div className="flex flex-wrap flex-col items-center gap-2 py-4 px-12  bg-sky-900 rounded-xl">
            <p>Rating: {detail.rating}</p>
            <p>Amount Collected: {detail.amount}</p>
          </div>
        </div>
      );
    } else if (currentGroup === 'weapons') {
      return (
        <div className="flex flex-wrap flex-col gap-5 p-4 text-white">
          <h1 className="text-6xl">{detail.name}</h1>
          <div className="p-4 bg-sky-900 max-w-4xl rounded-xl">
            <p>{detail.description}</p>
          </div>
        </div>
      );
    } else if (currentGroup === 'visions') {
      return (
        <div className="flex flex-wrap flex-col items-center gap-5 p-4 text-white">
          <h1
            style={{
              color: `${detail.color}`,
            }}
            className="text-6xl text-center"
          >
            {detail.name}
          </h1>
        </div>
      );
    } else if (currentGroup === 'roles') {
      return (
        <div className="flex flex-wrap flex-col gap-5 p-4 text-white">
          <h1 className="text-6xl">{detail.name}</h1>
          <div className="p-4 bg-sky-900 max-w-4xl rounded-xl">
            <p>{detail.description}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  function toggleDeletePopup() {
    setShowDeletePopup((showDeletePopup) => !showDeletePopup);
  }

  // State handler to get last response from Form component
  function postLastFormResponse(response) {
    setLastFormResponse(response);
  }

  function toggleForm() {
    setFormVisibility((formVisibility) => {
      return !formVisibility;
    });
  }

  return (
    <>
      {renderDetail(currentGroup)}
      <div className="flex gap-4 p-4 justify-start">
        <button
          className="text-white p-2 ease-in hover:scale-110 border-2 rounded-xl"
          onClick={toggleForm}
        >
          Update
        </button>
        <button
          className="text-rose-600 p-2 ease-in hover:scale-110 border-2 border-rose-600 rounded-xl"
          onClick={toggleDeletePopup}
        >
          Delete
        </button>
      </div>
      <Form
        group={currentGroup}
        isVisible={formVisibility}
        postLastResponse={postLastFormResponse}
        toggleForm={toggleForm}
        existingData={detail}
      />
      <DeletePopup
        visible={showDeletePopup}
        toggleVisibility={toggleDeletePopup}
        group={currentGroup}
        name={detail.name}
        id={id}
      />
    </>
  );
}

export default DetailPage;
