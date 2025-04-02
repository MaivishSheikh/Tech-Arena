import React from "react";
import { NavLink } from "react-router-dom";

export default function CardSection({
  title,
  value,
  iconClass,
  iconColor,
  viewLink,
  addLink,
  upLink,
  loading = false,
  percentage
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {title}
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-gray-900">
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                value
              )}
            </h3>
          </div>
          <div className={`h-12 w-12 rounded-full ${iconColor} flex items-center justify-center text-white`}>
            <i className={`${iconClass} text-lg`}></i>
          </div>
        </div>
        
        {percentage && (
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              parseFloat(percentage) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {percentage}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex justify-between">
        {viewLink && (
          <NavLink
            to={viewLink}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            View all
          </NavLink>
        )}
        
        <div className="flex space-x-2">
          {addLink && (
            <NavLink
              to={addLink}
              className="text-sm font-medium text-white px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700"
            >
              Add
            </NavLink>
          )}
          {upLink && (
            <NavLink
              to={upLink}
              className="text-sm font-medium text-white px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
            >
              Update
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}