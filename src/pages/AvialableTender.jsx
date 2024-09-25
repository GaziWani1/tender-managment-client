import React, { useState } from 'react';
import { fetchAPI, useFetch } from '../lib/fetch';
import Button from '../components/Button';
import Modal from '../components/Model';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContaxt';

const notify = (message) => toast(message);

const AvailableTender = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState(null);
  const [bid, setBid] = useState({
    tenderId: '',
    companyName: '',
    bidCost: '',
  });
  const {user} = useUser()

  const [lowestBid, setLowestBid] = useState('');
  const [lowestBidModel, setLowestBidModel] = useState('');

  const url = '/tender/list-tender';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data, loading, fetchData } = useFetch(url, options);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bid);

    const response = await fetchAPI(`/bid/placebid/${user?._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bid),
    });

    if (response.success) {
      closeModal();
      setBid({
        tenderId: '',
        companyName: '',
        bidCost: '',
      });
      notify(response.message);
    } else if (response.error) {
      closeModal();
      setBid({
        tenderId: '',
        companyName: '',
        bidCost: '',
      });
      notify(response.message);
    }
  };

  const openModal = (tender) => {
    setBid({
      ...bid,
      tenderId: tender._id,
    });
    setSelectedTender(tender);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBid({
      tenderId: '',
      companyName: '',
      bidCost: '',
    });
  };

  const openLowestBidModal = async (tender) => {
    setLowestBidModel(true);
    setSelectedTender(tender);

    const response = await fetchAPI(`/bid/lowestbid/${tender._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
    setLowestBid(response.data[0])

  };
  

  const closeLowestBidModal = () => {
    setLowestBidModel(false);
    setLowestBid({})
  };

  return (
    <>
      <div className="max-w-[100vw] mx-auto p-6">
        <div className="flex  justify-between items-center py-4">
          <h2 className="text-xl font-semibold">Available Tender List</h2>
        </div>
        {loading ? (
          <h1 className="ml-4 text-xl text-blue-600 text-center">Loading...</h1>
        ) : (
          <div className="overflow-x-auto">
          <table className=" overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Tender Name</th>
                <th className="py-3 px-6 text-left">Tender Description</th>
                <th className="py-3 px-6 text-left">Start Time</th>
                <th className="py-3 px-6 text-left">End Time</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data?.map((tender) => (
                <tr
                  key={tender._id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{tender?.tenderName}</td>
                  <td className="py-3 px-6">{tender?.description}</td>
                  <td className="py-3 px-6 text-nowrap">
                    {new Date(tender.startTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-nowrap">
                    {new Date(tender.endTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-2 flex space-x-2">
                    <button
                      className="bg-blue-500 text-white text-sm rounded-md font-semibold py-2 px-2 text-nowrap"
                      onClick={() => openModal(tender)}
                    >
                      Place bid
                    </button>
                    <button
                      className="bg-gray-500 text-white text-sm rounded-md font-semibold py-2 px-2 text-nowrap"
                      onClick={() => openLowestBidModal(tender)}
                    >
                      Lowest bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={`Place bid for ${selectedTender?.tenderName}`}
          >
            <form onSubmit={handleSubmit}>
              <Input
                label="Company Name"
                id="companyName"
                type="text"
                value={bid.companyName}
                onChange={(e) =>
                  setBid((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="Company Name"
                required
              />
              <Input
                label="Bid Cost"
                id="bidCost"
                type="text"
                value={bid.bidCost}
                onChange={(e) =>
                  setBid((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="90000"
                required
              />
              <Button className='w-full' type="submit" text="Place bid" />
            </form>
          </Modal>
        )}
        {lowestBidModel && (
          <Modal
            isOpen={lowestBidModel}
            onClose={closeLowestBidModal}
            title={`Loswest bid of ${selectedTender?.tenderName}`}
          >
            {lowestBid ? <>
              <p>Bid Cost : {lowestBid?.bidCost}</p>
              <p>Company Name : {lowestBid?.companyName}</p>
              <p>Bid Date : {new Date(lowestBid?.bidTime).toLocaleString()}</p>
              </> : <p className='text-center'>
              -
            </p>
            }
          </Modal>
        )}
      </div>
    </>
  );
};

export default AvailableTender;
