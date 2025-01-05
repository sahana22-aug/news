import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import EverythingCard from './EverythingCard';

function News() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 12;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)  // Changed to http:// if you're using local server
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError('Failed to fetch data');
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        data.map((article, index) => (
          <EverythingCard
            key={index}
            countryName="USA"
            countryLink={article.source.url || "https://localhost:3000"}  // Make sure the link points to the article source
            title={article.title}
            imgUrl={article.urlToImage}
            description={article.description}
            url={article.url}
            source={article.source.name}
            author={article.author}
            publishedAt={article.publishedAt}
            imageUrlLeft={article.urlToImage}
            imageLeftTitle={article.title}
            memberIcon={<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />}
            memberText="Member"
            cardTitle={article.title}
            cardDescription={article.description}
            authorImage={article.urlToImage}
            authorName={article.author}
            publishedDate={article.publishedAt}
          />
        ))
      )}
      <div>
        <button onClick={handlePrev} disabled={page <= 1}>Previous</button>
        <button onClick={handleNext} disabled={page * pageSize >= totalResults}>Next</button>
      </div>
    </div>
  );
}

export default News;
