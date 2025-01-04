import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import EverythingCard from './EverythingCard';
import CountryDropdown from './Countrydropdown';

function TopHeadlines() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default country

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 12;

  useEffect(() => {
    const categoryParam = params.category ? `&category=${params.category}` : "";
    const countryParam = selectedCountry ? `&country=${selectedCountry}` : "";
    setIsLoading(true);
    fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}${categoryParam}${countryParam}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return response.json();
      })
      .then(json => {
        setTotalResults(json.data.totalResults);
        setData(json.data.articles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data", error);
        setIsLoading(false);
      });
  }, [page, params.category, selectedCountry]);

  return (
    <>
      <CountryDropdown selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {isLoading ? (
          <Loader />
        ) : (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                title={element.title}
                description={element.description}
                author={element.author}
                publishedAt={element.publishedAt}
                source={element.source.name}
                url={element.url}
                imgUrl={element.urlToImage}
                key={index}
              />
            ))
          ) : (
            <p>No articles found for this category or criteria</p>
          )
        )}
      </div>
      {!isLoading && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn' onClick={handlePrev}>
            &larr;Prev
          </button>
          <p className='font-semibold opacity-80'>
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className='pagination-btn text-center'
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next&rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;