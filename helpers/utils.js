const getGanres = async () => {
  let gangreKeyboard = [];
  await fetch(
    'https://newly-released-movies.p.rapidapi.com/genres',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-key': '91166e2d9cmsh49157e1ececf2a1p17a2d2jsnaee3ad84f8e2',
        'x-rapidapi-host': 'newly-released-movies.p.rapidapi.com',
      },
    }
  )
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      gangreKeyboard.push([{ text: element.genre, callback_data: element.genre}])
    })  
  })
   return gangreKeyboard;
};

const getMovies = async (genre) => {
  let movies = [];
  await fetch(
    `https://newly-released-movies.p.rapidapi.com/movies/${genre}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-key': '91166e2d9cmsh49157e1ececf2a1p17a2d2jsnaee3ad84f8e2',
        'x-rapidapi-host': 'newly-released-movies.p.rapidapi.com',
      },
    }
  )
  .then((response) => response.json())
  .then((data) => {
    if(data.length > 0) {
      data.forEach((element) => {
        movies.push(element.title)
      })  
    } else {
      movies = ['Фильмов не найдено'];
    }
    
  })
   return movies.join(' \n\n ');
};


export const Utils = {
  getGanres,
  getMovies
};