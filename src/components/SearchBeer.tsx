import React from "react";
import { Pagination } from "./Pagination";
import { useState, useEffect } from "react";
import { BeerList } from "../interfaces/beerInterface";
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const [beer, setBeer] = useState<BeerList[]>([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]) as any;
  const totalPages = 10;
  const ItemPerPage = 10;
  const handlePages = (updatedPage: number) => setPage(updatedPage);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const result = (event.target as HTMLInputElement).value;
    setSearch(result);
  };

  const BeersData = async () => {
    await fetch(
      `https://api.punkapi.com/v2/beers/?page=${page}&per_page=${ItemPerPage}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw "error";
        }
      })
      .then((data) => {
        //console.log(data);
        setBeer(data);
      });
  };

  useEffect(() => {
    BeersData();
    //console.log(beer);
  }, [page]);

  useEffect(() => {
    //filter will only return elements where the function you
    //specify returns a value of true for each element passed to the function.
    const filteredBeer = beer.filter((bb) =>
      bb.name?.toLowerCase().includes(search)
    );
    setResults(filteredBeer);
  }, [search, beer]);

  return (
    <main className="main">
      <section className="hero">
        <h1>You thirsty?</h1>
        <div className="block">
          <input
            onChange={handleChange}
            type="text"
            name="search"
            placeholder="search"
            className="inputField"
            value={search}
          />
        </div>
      </section>

      {/* <p>Result: {results.length}</p> */}

      <ul className="cards">
        {results.length > 0 ? (
          results.map((beers: any, key: any) => (
            <li className="cardsItem" key={key}>
              <div className="card">
                <Link to={`/singlebeer/${beers["id"]}`}>
                  <img src={beers?.image_url} />
                </Link>
                <div className="cardContent">
                  <h2 className="cardText">{beers?.name}</h2>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>{search} not found!</p>
        )}
      </ul>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePagination={handlePages}
      />

      <footer>
        <div className="footerContent">
          <p>copyright &copy;2022 Made with ♥</p>
          <ul className="socials">
            <li>
              <a href="https://github.com/Silvia02">
                <i className="fa fa-github-square"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/silvia-morais-b99106159/">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default Search;
