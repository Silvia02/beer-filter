import { error } from "console";
import React from "react";
import { Pagination } from "./Pagination";
import { useState, useEffect } from "react";
import { BeerList } from "../interfaces/beerInterface";
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const [beer, setBeer] = useState<BeerList[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = 10;
  const ItemPerPage = 6;
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
        console.log(data);
        setBeer(data);
      });
  };

  useEffect(() => {
    BeersData();
    console.log(beer);
  }, [page]);

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
          {/* <a href="#breweries">Browse Breweries</a> */}
        </div>
      </section>

      <ul className="cards">
        {beer &&
          beer?.map((beer) => {
            if (
              search === "" ||
              beer?.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <li className="cards-item">
                  <div className="card">
                    <Link to={`/singlebeer/${beer["id"]}`}>
                      <img src={beer.image_url} />
                    </Link>
                    <div className="card-content">
                      <h2 className="card-text">{beer?.name}</h2>
                    </div>
                  </div>
                </li>
              );
            }
          })}
      </ul>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePagination={handlePages}
      />

      <footer>
        <div className="footer-content">
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
