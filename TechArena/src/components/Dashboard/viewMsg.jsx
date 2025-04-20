import React, { useState, useEffect } from "react";

export default function ViewMsg(props) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/messages/");
        const result = await response.json();
        if (result.success) {
          const sortedMessages = result.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setMessages(sortedMessages);
        } else setError(result.message);
      } catch (err) {
        setError("Failed to fetch messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="mx-auto p-6 my-4 bg-white shadow-2xl rounded-lg"
        style={{ fontFamily: "Poppins", maxWidth: "1300px" }}
      >
        <div className="flex justify-between items-center">
          <h1 style={{ fontSize: "30px", fontWeight: 600 }}>Messages</h1>
        </div>
        <div className="h-full w-full px-4 mt-8">
          <table className="w-full min-w-max table-auto text-left rounded-md">
            <thead>
              <tr className="bg-gray-100 rounded-3xl">
                <th className="p-4 rounded-s-xl">S.No</th>
                <th className="p-4">Sender Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Message</th>
                <th className="p-4 rounded-e-xl"></th>
              </tr>
            </thead>
            <tbody>
              {messages.map(({ name, email, message }, index) => {
                const isLast = index === messages.length - 1;
                const classes = isLast ? "px-4 py-2" : "px-4 py-1 border-b";
                return (
                  <tr
                    className="hover:bg-gray-50"
                    style={{ fontSize: "14px" }}
                  >
                    <td
                      className={classes}
                      style={{ fontWeight: 600, fontSize: "15px" }}
                    >
                      {index + 1}
                    </td>
                    <td className={classes}>{name}</td>
                    <td className={classes}>{email}</td>
                    <td className={classes}>{message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
