import React from "react";

export default function Cards(props) {
  return (
    <>
      <div className="relative">
        <button className="py-1 px-3 rounded-3xl mx-5" style={{background: "#002864"}}>
          <i class="fa-sharp fa-solid fa-chevron-left" style={{color: "white"}}></i>
        </button>
        <button className="py-1 px-3 rounded-3xl mx-5" style={{background: "#002864"}}>
          <i class="fa-sharp fa-solid fa-chevron-right" style={{color: "white"}}></i>
        </button>
      </div>
    </>
  );
}
