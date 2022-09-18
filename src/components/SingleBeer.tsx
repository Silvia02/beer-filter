import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface SingleBeersProps {
  name?: string;
  image_url?: string;
  food_pairing?: string[]; // ? = optional
}

export const SingleBeers: React.FunctionComponent<SingleBeersProps> = () => {
  const [singleBeer, setsingleBeer] = useState<SingleBeersProps[]>([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const handleNavigation = () => {
    navigate(-1);
  };

  const getSingleBeer = async () => {
    await fetch(`https://api.punkapi.com/v2/beers/${id}`).then((res) => {
      res.json().then((data) => {
        setsingleBeer(data);
        console.log(data);
      });
    });
  };

  useEffect(() => {
    getSingleBeer();
  }, [id]);

  return (
    <>
      <button className="button-back" onClick={handleNavigation}>
        Back
      </button>
      <div className="singlebeer-container">
        <div className="beer-item">
          {singleBeer &&
            singleBeer.map((beer) => {
              return (
                <>
                  <img src={beer?.image_url} />
                  <p>Name: {beer.name}</p>
                  <span>Matches with:</span>
                  {beer.food_pairing?.map((foodPairing) => {
                    return <li>{foodPairing}</li>;
                  })}
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
