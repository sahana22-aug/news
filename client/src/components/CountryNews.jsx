import React from 'react';
import Loader from './Loader';

function CountryNews() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 12;

  useEffect(() => {
    fetch(`http://localhost:3000/country/${params.iso}?page=${page}&pageSize=${pageSize}'`)
      .then(response => {
        if (response.ok) {
        return response.json();
        }
        else{
          console.error('Failed to fetch data ', response.statusText);
          setIsLoading(false);
          return null;
        }
      })
      .then(myJson => {
        if(myJson){
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        }
        setTotalResults(json.data.totalResults);
        setData(json.data.articles);
        setIsLoading(false);
      })
      
  }, [page, params.iso]);

  return (
    <>
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {isLoading ? (data.length > 0 ? (data.map((element, index) => (
            <Card
              title={element.title}
              description={element.description}
              author={element.author}
              publishedAt={element.publishedAt}
              source={element.source.name}
              url={element.url}
              imageUrl={element.urlToImage}
              key={index}
            />
          ))
        ) : (
          <p> no article found for this category or cretiera</p>
        )
        ) : (
          <Loader />
        )}
      </div>
      {isLoading && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn' onClick={handlePrev}>
            &larr;Prev
          </button>
          <p className='font-semibold opacity-80'>
            {page} of {Math.ceil(totalResults / 15)}
          </p>
          <button
            className='pagination-btn text-center'
            disabled={page >= Math.ceil(totalResults / 15)}
            onClick={handleNext}
          >
            Next&rarr;
          </button>
        </div>
      )}
    
    </>
  );
}

export default CountryNews;

