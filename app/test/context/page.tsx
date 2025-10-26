'use client';
import React, { useContext } from "react";
import MyContext from "@/components/MyContext"; // Adjust the path if needed

const Child = () => {
  const context = useContext(MyContext);

  React.useEffect(() => {
    if (context) {
      context.setValue('nova vrednost');
    }
  }, [context]);



  return (
    <div>
      <p>Trenutna vrednost: {context ? context.value : ''}</p>
    </div>
  );
};

export default Child;
