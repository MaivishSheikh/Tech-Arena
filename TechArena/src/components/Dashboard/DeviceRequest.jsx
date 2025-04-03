import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeviceRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/productRequests");
        if (response.data.success) {
          setRequests(response.data.data);
        } else {
          setError("Failed to fetch product requests.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/productRequests/approve/${requestId}`);
      // Refresh the list after approval
      const updatedResponse = await axios.get("http://localhost:8000/api/v1/productRequests");
      setRequests(updatedResponse.data.data);
    } catch (err) {
      setError("Failed to approve request.");
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      setError("Please enter a rejection reason");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/v1/productRequests/${selectedRequest._id}`, {
        data: { rejectionReason }
      });
      // Refresh the list after rejection
      const updatedResponse = await axios.get("http://localhost:8000/api/v1/productRequests");
      setRequests(updatedResponse.data.data);
      setRejectModalVisible(false);
      setRejectionReason("");
    } catch (err) {
      setError("Failed to reject request.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto p-6 my-4 bg-white shadow-2xl rounded-lg" style={{ maxWidth: "1300px" }}>
      <h1 className="text-2xl font-semibold">Product Requests</h1>
      
      <div className="h-full w-full px-4 mt-6">
        <table className="w-full min-w-max table-auto text-left rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">S.No</th>
              <th className="p-4">Request ID</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Manufacturer</th>
              <th className="p-4">Description</th>
              <th className="p-4">Price (INR)</th>
              <th className="p-4">Status</th>
              <th className="p-4">Request Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-semibold">{index + 1}</td>
                <td className="px-4 py-2">{request.requestID}</td>
                <td className="px-4 py-2">{request.productName}</td>
                <td className="px-4 py-2">{request.manufacturerName}</td>
                <td className="px-4 py-2">{request.description}</td>
                <td className="px-4 py-2 font-semibold">₹{request.price}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === "approved" 
                      ? "bg-green-100 text-green-800" 
                      : request.status === "rejected" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(request._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedRequest(request);
                          setRejectModalVisible(true);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reject Product Request</h2>
            <p className="mb-2">Please specify the reason for rejection:</p>
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter rejection reason..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setRejectModalVisible(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}