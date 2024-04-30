import React from "react";

const HomeVigilante = () => {
  return (
    <div>
      <h2>Bienvenido, Vigilante</h2>
      {
        <iframe
          src="http://localhost:1880/ui/#!/1?socketid=NjPmeaiVizBQZ5-yAAAB"
          width="100%"
          height="750px"
          frameborder="0"
        ></iframe>
      }
    </div>
  );
};

export default HomeVigilante;
