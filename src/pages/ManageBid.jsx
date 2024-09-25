import React from "react";
import { useFetch } from "../lib/fetch";
import { useUser } from "../context/UserContaxt";

const ManageBid = () => {

  const { user } = useUser();

  const url = `/bid/user-list-bid/${user?._id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };

  const { data, loading } = useFetch(url, options);


  return  <div className="max-w-[100vw] mx-auto p-6">
  <div className="flex justify-between items-center py-4">
    <h2 className="text-xl font-semibold">Your Bids</h2>
  </div>
  {loading ? (
    <h1 className="ml-4 text-xl text-blue-600 text-center">Loading...</h1>
  ) : (
    <div className="overflow-x-auto">
    <table className=" min-w-full overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Company Name</th>
          <th className="py-3 px-6 text-left">Bid Cost</th>
          <th className="py-3 px-6 text-left">Bid Time</th>
          <th className="py-3 px-6 text-left">Placed in 5 mins.</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {data?.map((bid) => (
          <tr key={bid?._id} className="border-b border-gray-300 hover:bg-gray-100">
            <td className="py-3 px-6">{bid?.companyName}</td>
            <td className="py-3 px-6">{bid?.bidCost}</td>
            <td className="py-3 px-6 text-nowrap">
              {new Date(bid?.bidTime).toLocaleString()}
            </td>
            <td className="py-3 px-6 text-nowrap font-semibold">
              {bid?.flag ? 'yes' : 'No'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )}
</div>
};

export default ManageBid;
