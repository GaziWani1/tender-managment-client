import React, { useState } from 'react';
import Button from '../components/Button';
import { fetchAPI, useFetch } from '../lib/fetch';
import Modal from '../components/Model';
import Input from '../components/Input';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import toast from 'react-hot-toast';

const notify = (message) => toast(message);

const Tender = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tender, setTender] = useState({
    tenderName: "",
    description: "",
    startTime: "",
    endTime: "",
    bufferTime: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const url = '/tender/list-tender';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data, loading, error , fetchData } = useFetch(url, options);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetchAPI('/tender/create-tender',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(tender)
    })
    if(response.success){
      fetchData()
      closeModal()
      setTender({
        tenderName: "",
        description: "",
        startTime: "",
        endTime: "",
        bufferTime: "",
      });
      notify(response.message)
    }
    else if(response.error){
      closeModal()
      notify(response.message)
    }
  };

  return (
    <>
      <div className="max-w-[100vw] mx-auto p-6">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-xl font-semibold">Tender List</h2>
          <Button
            className="w-[150px]"
            text="Create Tender"
            onClick={openModal}
          />
        </div>
        {loading ? (
          <h1 className="ml-4 text-xl text-blue-600 text-center">Loading...</h1>
        ) : (
          <div className='overflow-x-auto'>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Tender Name</th>
                <th className="py-3 px-6 text-left">Tender description</th>
                <th className="py-3 px-6 text-left">Tender Start Time</th>
                <th className="py-3 px-6 text-left">Tender End Time</th>
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
                  <td className="py-3 px-6">
                    {new Date(tender.startTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(tender.endTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Tender">
      <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Enter Tender Name"
        id="tenderName"
        type="text"
        name="tenderName"
        value={tender.tenderName}
        onChange={(e) =>
          setTender((prev) => ({
            ...prev,
            tenderName: e.target.value,
          }))
        }
        placeholder="Tender name"
        required
      />
      <Input
        label="Enter Tender description"
        id="description"
        type="text"
        name="description"
        value={tender.description}
        onChange={(e) =>
          setTender((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        placeholder="Desc....."
        required
      />
    <div className="flex w-full flex-row space-x-4 justify-between">
        <CustomDateTimePicker
          label="Start Time"
          placeholder="Select Start Time"
          onDateChange={(date) =>
            setTender((prev) => ({
              ...prev,
              startTime: date, 
            }))
          }
          value={tender.startTime}
        />
        <CustomDateTimePicker
          label="End Time"
          placeholder="Select End Time"
          onDateChange={(date) =>
            setTender((prev) => ({
              ...prev,
              endTime: date, // Correctly set endTime
            }))
          }
          value={tender.endTime}
        />
      </div>
      <Input
        label="Buffer Time"
        id="bufferTime"
        type="number"
        value={tender.bufferTime}
        onChange={(e) =>
          setTender((prev) => ({
            ...prev,
            bufferTime: e.target.value,
          }))
        }
        placeholder="Enter Buffer Time"
        required
        className="w-full"
      />
      <Button type="submit" className='w-full' text="Create" />
    </form>
      </Modal>
    </>
  );
};

export default Tender;
