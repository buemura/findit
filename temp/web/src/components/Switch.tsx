import React, { useState } from "react";

export default function Switch({ className, id }) {
  const [count, setCount] = useState<string>("");

  return (
    <div
      className={className + count}
      id={id}
      onClick={() => {
        setCount(count === " active" ? "" : " active");
        document.querySelector(".menuItems").classList.toggle("active");
        document.querySelector(".pageLinks").classList.toggle("active");
      }}
    ></div>
  );
}
