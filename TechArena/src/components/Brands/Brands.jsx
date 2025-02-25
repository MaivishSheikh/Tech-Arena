import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigation = (event, brandTitle) => {
    event.preventDefault();
    navigate("/deviceShowcase/Phone", { state: { subCategory: brandTitle } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/brands/");
        const result = await response.json();

        if (result.success) {
          setBrands(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-center text-3xl mt-10 mb-5 font-bold">Shop By Brands</h1>
      <div className="flex justify-center mb-10">
        <ul className="grid grid-cols-5 py-5" style={{columnGap: "80px", rowGap: "20px"}}>
          {brands.map((brand) => (
            <li key={brand._id} className="flex justify-center items-center">
              <NavLink onClick={(event) => handleNavigation(event, brand.title)}>
                <img
                  src={brand.brandImage}
                  alt={brand.title}
                  width={brand.width}
                  height={brand.height}
                  className="transition-transform transform hover:scale-105 cursor-pointer"
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
