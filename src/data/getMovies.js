import data from "./movies.json";

const getMovies = () => {
  // const { movies } = data;
  return new Promise((resolve, reject) => {
    //get the data from JSON file as response
    //Add 2 secs delay to the promise
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

export default getMovies;
