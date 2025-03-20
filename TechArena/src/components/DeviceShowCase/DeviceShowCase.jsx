import React, { useEffect, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import FilterBar from "../FilterBar/FilterBar";
import T from "../../assets/T.jpg"
import { Spinner } from "@material-tailwind/react";

const DeviceShowCase = () => {
  const { category } = useParams();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageStates, setImageStates] = useState({});
  const [filters, setFilters] = useState({
    devices: [],
    brands: [],
    subCategory: [],
    operatingSystem: [],
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFilters({
      devices: [],
      brands: [],
      subCategory: [],
      operatingSystem: [],
    });
    if (category) {
      fetchDevices(`http://localhost:8000/api/v1/devices/category/${category}`);
    } else {
      fetchDevices("http://localhost:8000/api/v1/devices");
    }
  }, [category]);

  const fetchDevices = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setDevices(result.data);
        const initialImages = {};
        result.data.forEach((device) => {
          initialImages[device._id] = device.deviceImage;
        });
        setImageStates(initialImages);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch devices.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading)
    return (
      <div
        className="h-screen flex justify-center items-center bg-cover bg-center object-contain"
        style={{ backgroundImage: `url(${T})` }}
      >
        <div>
          <svg
            className="animate-spin"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2592_7121)">
              <path
                opacity="0.21"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.6686 4.92934C19.3907 5.00662 19.1192 5.09651 18.8445 5.19591C17.8027 5.54894 16.6679 4.99802 16.3053 3.9531C15.9428 2.90817 16.5032 1.77644 17.5482 1.4139C17.8701 1.29846 18.189 1.19251 18.5143 1.09919C19.5752 0.784005 20.685 1.37933 21.0128 2.43391C21.328 3.49488 20.7296 4.61415 19.6686 4.92934Z"
                fill="#3758F9"
              />
              <path
                opacity="0.25"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.4882 3.99731C26.1941 3.99561 25.9126 3.98752 25.6249 3.99844C24.5245 4.01656 23.6125 3.13881 23.588 2.0258C23.5699 0.925399 24.4572 0.0165644 25.5576 -0.00155723C25.8959 -0.00640214 26.2342 -0.0112467 26.579 -0.00347406C27.6859 0.0226443 28.5538 0.938563 28.5277 2.0455C28.511 3.15556 27.5951 4.02343 26.4882 3.99731Z"
                fill="#3758F9"
              />
              <path
                opacity="0.28"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M35.8108 4.00158C35.446 5.05012 34.3071 5.60287 33.2617 5.22859L32.4445 4.96069C31.3804 4.64343 30.7898 3.52374 31.1166 2.46274C31.4402 1.41124 32.5504 0.817532 33.6114 1.1443C33.776 1.18775 33.9376 1.24071 34.0991 1.29366C34.2607 1.34662 34.4222 1.39958 34.5806 1.46204C35.6292 1.82681 36.1724 2.96254 35.8108 4.00158Z"
                fill="#3758F9"
              />
              <path
                opacity="0.3"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M42.1369 8.10641C41.4582 8.98891 40.2036 9.15642 39.3275 8.49037C39.1021 8.31124 38.8704 8.15111 38.6324 7.97837C37.7248 7.34409 37.5004 6.10242 38.1442 5.19796C38.7785 4.29038 40.0202 4.06601 40.9277 4.70028C41.2102 4.8981 41.48 5.10231 41.7498 5.30652C42.6259 5.97257 42.8029 7.23029 42.1369 8.10641Z"
                fill="#3758F9"
              />
              <path
                opacity="0.33"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M46.8652 13.9711C45.9544 14.5986 44.7137 14.3708 44.083 13.4695C43.9206 13.2268 43.755 12.9936 43.5767 12.7668C42.9083 11.8847 43.0886 10.6284 43.9707 9.9599C44.8592 9.30405 46.1061 9.48126 46.7745 10.3634C46.9814 10.6312 47.1757 10.9053 47.3668 11.189C47.9943 12.0998 47.776 13.3436 46.8652 13.9711Z"
                fill="#3758F9"
              />
              <path
                opacity="0.38"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.5661 21.0129C48.5051 21.328 47.3859 20.7296 47.0707 19.6686C46.9903 19.4002 46.9035 19.1192 46.8041 18.8446C46.4511 17.8028 47.002 16.6679 48.0469 16.3054C49.0918 15.9429 50.2236 16.5033 50.5861 17.5482C50.7016 17.8702 50.8075 18.1891 50.9008 18.5143C51.216 19.5753 50.6207 20.6851 49.5661 21.0129Z"
                fill="#3758F9"
              />
              <path
                opacity="0.42"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.9514 28.5372C48.8539 28.5142 47.9766 27.5952 48.0027 26.4883C48.0013 26.2037 48.0125 25.9127 48.0016 25.625C47.9834 24.5246 48.8612 23.6126 49.9711 23.5976C51.0746 23.57 51.9834 24.4572 52.0016 25.5576C52.0064 25.896 52.0112 26.2343 52.0035 26.579C51.9774 27.686 51.0583 28.5634 49.9514 28.5372Z"
                fill="#3758F9"
              />
              <path
                opacity="0.55"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M50.8652 33.6145L50.5475 34.5838C50.1732 35.6292 49.0375 36.1725 47.9984 35.8108C46.9499 35.446 46.3972 34.3072 46.7714 33.2618L47.0393 32.4445C47.3566 31.3804 48.4763 30.7898 49.5373 31.1166C50.5888 31.4402 51.1825 32.5504 50.8652 33.6145Z"
                fill="#3758F9"
              />
              <path
                opacity="0.65"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.2997 40.9277C47.1019 41.2102 46.8977 41.48 46.6935 41.7498C46.0243 42.6354 44.7697 42.8029 43.8936 42.1369C43.0111 41.4582 42.8436 40.2036 43.5097 39.3275C43.6888 39.1021 43.8489 38.8704 44.0217 38.6324C44.6559 37.7248 45.904 37.513 46.8021 38.1442C47.7096 38.7785 47.934 40.0201 47.2997 40.9277Z"
                fill="#3758F9"
              />
              <path
                opacity="0.7"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.6367 46.7746C41.3689 46.9814 41.0947 47.1757 40.8111 47.3669C39.8972 48.0039 38.6564 47.776 38.0289 46.8652C37.4014 45.9544 37.6292 44.7137 38.5305 44.0831C38.7732 43.9206 39.0064 43.755 39.2332 43.5768C40.1153 42.9083 41.3717 43.0886 42.0401 43.9707C42.696 44.8593 42.5188 46.1061 41.6367 46.7746Z"
                fill="#3758F9"
              />
              <path
                opacity="0.8"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.4518 50.5861C34.1298 50.7015 33.811 50.8075 33.4857 50.9008C32.4247 51.216 31.315 50.6207 30.9872 49.5661C30.672 48.5051 31.2704 47.3858 32.3314 47.0707C32.6093 46.9934 32.8808 46.9035 33.1554 46.8041C34.1972 46.451 35.3321 47.002 35.6946 48.0469C36.0572 49.0918 35.4967 50.2236 34.4518 50.5861Z"
                fill="#3758F9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.4424 52.0015C26.104 52.0064 25.7657 52.0112 25.4209 52.0034C24.314 51.9773 23.4461 51.0614 23.4723 49.9545C23.4858 48.8539 24.4048 47.9765 25.5117 48.0027C25.8027 48.0139 26.0873 48.0124 26.375 48.0015C27.4754 47.9834 28.3874 48.8612 28.4119 49.9742C28.43 51.0746 27.5428 51.9834 26.4424 52.0015Z"
                fill="#3758F9"
              />
              <path
                opacity="0.05"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8834 49.5373C20.5598 50.5888 19.4496 51.1825 18.3855 50.8652L17.4162 50.5475C16.3708 50.1732 15.8276 49.0375 16.1892 47.9984C16.554 46.9499 17.6897 46.4067 18.7383 46.7714L19.5555 47.0393C20.6165 47.3661 21.2102 48.4763 20.8834 49.5373Z"
                fill="#3758F9"
              />
              <path
                opacity="0.07"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8558 46.802C13.2215 47.7096 11.9798 47.934 11.0722 47.2997C10.7898 47.1019 10.52 46.8977 10.2502 46.6935C9.37407 46.0274 9.19705 44.7697 9.8631 43.8936C10.5418 43.0111 11.7964 42.8435 12.6725 43.5096C12.8979 43.6887 13.1264 43.8584 13.3676 44.0216C14.2752 44.6559 14.4964 45.9071 13.8558 46.802Z"
                fill="#3758F9"
              />
              <path
                opacity="0.09"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.0292 42.0401C7.14069 42.6959 5.89385 42.5187 5.22538 41.6366C5.0185 41.3688 4.82423 41.0947 4.63308 40.811C4.00558 39.9002 4.22392 38.6564 5.1347 38.0289C6.04549 37.4013 7.28625 37.6292 7.91688 38.5305C8.07936 38.7732 8.24496 39.0064 8.42318 39.2332C9.09165 40.1153 8.91132 41.3716 8.0292 42.0401Z"
                fill="#3758F9"
              />
              <path
                opacity="0.11"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.95318 35.6946C2.90826 36.0572 1.77341 35.5062 1.41398 34.4518C1.29854 34.1298 1.1926 33.811 1.09927 33.4857C0.784089 32.4247 1.37941 31.315 2.43399 30.9872C3.49496 30.672 4.61424 31.2704 4.92942 32.3314C5.0067 32.6093 5.0966 32.8808 5.19599 33.1554C5.54903 34.1972 4.9981 35.3321 3.95318 35.6946Z"
                fill="#3758F9"
              />
              <path
                opacity="0.13"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.02579 28.4119C0.925394 28.43 0.0134432 27.5523 -0.00156331 26.4424C-0.00640825 26.104 -0.0112527 25.7657 -0.0034801 25.421C0.0226382 24.314 0.938557 23.4461 2.0455 23.4723C3.14294 23.4953 4.02342 24.4048 3.9973 25.5117C3.9956 25.8058 3.98752 26.0873 3.99843 26.375C4.01655 27.4754 3.1388 28.3874 2.02579 28.4119Z"
                fill="#3758F9"
              />
              <path
                opacity="0.19"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4696 7.91696C13.2269 8.07945 12.9906 8.25455 12.7669 8.42326C11.8848 9.09174 10.6284 8.91141 9.95996 8.02928C9.3041 7.14077 9.48131 5.89394 10.3634 5.22546C10.6312 5.01858 10.9054 4.82432 11.189 4.63317C12.0998 4.00566 13.3437 4.224 13.9712 5.13479C14.5987 6.04558 14.3709 7.28634 13.4696 7.91696Z"
                fill="#3758F9"
              />
              <path
                opacity="0.15"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.22857 18.7382L4.96068 19.5555C4.64341 20.6196 3.52373 21.2102 2.46272 20.8834C1.41123 20.5598 0.817514 19.4496 1.13478 18.3855L1.45251 17.4162C1.82679 16.3708 2.96253 15.8275 4.00156 16.1892C5.05011 16.554 5.60285 17.6928 5.22857 18.7382Z"
                fill="#3758F9"
              />
              <path
                opacity="0.17"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.4904 12.6725C8.31127 12.8979 8.14803 13.1391 7.9784 13.3676C7.34412 14.2752 6.09294 14.4965 5.19487 13.8653C4.28729 13.231 4.06603 11.9798 4.70031 11.0723C4.89813 10.7898 5.10234 10.52 5.30655 10.2502C5.9726 9.3741 7.23032 9.19708 8.10332 9.87264C8.98893 10.5418 9.15645 11.7964 8.4904 12.6725Z"
                fill="#3758F9"
              />
            </g>
            <defs>
              <clipPath id="clip0_2592_7121">
                <rect width="52" height="52" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const filteredDevices = devices.filter((device) => {
    const matchesDevice =
      filters.devices.length === 0 ||
      filters.devices.some((sub) => device.category.split(", ").includes(sub));

    const matchesBrand =
      filters.brands.length === 0 ||
      filters.brands.some((sub) =>
        device.subCategory.split(", ").includes(sub)
      );

    const matchesSubCategory =
      filters.subCategory.length === 0 ||
      filters.subCategory.some((sub) =>
        device.subCategory.split(", ").includes(sub)
      );

    const matchesOS =
      filters.operatingSystem.length === 0 ||
      filters.operatingSystem.some((sub) =>
        device.subCategory.split(", ").includes(sub)
      );

    return matchesDevice && matchesBrand && matchesSubCategory && matchesOS;
  });

  return (
    <div className="flex">
      <FilterBar setFilters={handleFilterChange} />
      <div>
        <ul className="grid grid-cols-4 p-5 gap-4">
          {filteredDevices.map((device) => (
            <li key={device._id}>
              <NavLink to={`/devices/${device.generalInfo.brandModel}`}>
                <div
                  className="p-4 bg-white shadow-lg rounded-lg border"
                  style={{ maxWidth: "300px", height: "350px" }}
                >
                  <div className="flex items-center flex-col">
                    <img
                      src={imageStates[device._id]}
                      alt={device.generalInfo.brandModel}
                      onMouseEnter={() =>
                        setImageStates((prev) => ({
                          ...prev,
                          [device._id]: device.alternateImage,
                        }))
                      }
                      onMouseLeave={() =>
                        setImageStates((prev) => ({
                          ...prev,
                          [device._id]: device.deviceImage,
                        }))
                      }
                      className="p-2 transition-all duration-1000 ease-in"
                      style={{ width: "300px", height: "250px" }}
                    />
                    <h2 className="text-lg font-bold">
                      {device.generalInfo.brandModel}
                    </h2>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeviceShowCase;
