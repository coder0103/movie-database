const movContainer = document.getElementById("movContainer");
const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;

// const api_url_genres = "https://api.themoviedb.org/3/genre/movie/list";
const api_url_movies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=1"`;
const img_path = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;
// `https://api.themoviedb.org/3/search/movie?api_key=5e750355564957a2353604d8a9344e94&query="war`;

const contentInfo = document.getElementById("content-info");
const moviesHeader = document.getElementById("moviesHeader");

// const video_url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}`
// const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key="${api_key}&page=2"`

// Get Genre list
const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=5e750355564957a2353604d8a9344e94&page=1`;

// Popular movies list
const api_popular_list = `https://api.themoviedb.org/3/discover/movie?api_key=5e750355564957a2353604d8a9344e94&sort_by=popularity.desc&page=1  `;

// airing today movies
const api_air_today = `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}`;

const youtube_watch = `https://www.youtube.com/watch?v=`

async function getGenres() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list" + "?api_key=" + api_key
  );
  const genreData = await res.json();
}

const selectedMovieDisplay = document.getElementById("selectedMovieDisplay");

// Get Movie Details
async function getMovieDetails(movieContent, index) {
  // console.log(movieContent[index])
  // console.log(selectedMovieDisplay.innerHTML);
  const movContent = movieContent[index];
  const {
    id,
    title,
    adults,
    vote_average,
    vote_count,
    original_language,
    overview,
    poster_path,
    genre_ids,
    release_date,
  } = movContent;

  let results = [];
  let res;

  // Get genres according to specific id
  const datas = await getGenres(api_url_genres);
  genre_ids.forEach((item) => {
    console.log(item);

    datas.genres.filter((data) => {
      if (data.id === item) {
        results.push(data.name);
      }
    });
  });

  // Update Movie Details
  selectedMovieDisplay.innerHTML = `
   <div class="d-flex text-white gap-5">
   <i class="fas fa-times text-danger position-absolute fs-3 close-btn"></i>  
    <img src="${
      img_path + poster_path
    }" alt="" class="img-fluid" style="width: 31%"> 

    <div>
      <h1 class="text-white">${title}</h1>
      <section class="mt-5 d-flex justify-content-center flex-column">
        <div>
          <small class="text-muted fw-bold">Language: <span class="badge bg-primary">${original_language}</span></small>
        </div>
        <div class="d-flex genre align-items-center gap-2">
            <h4 class="text-warning">Genre: </h4>
            <a class="genre-a">${results
              .map((result) => `<a class="genre-item">${result}</a>`)
              .join(" | ")}</a>
        </div>
        <div class="overview">
            <h4 class="text-warning">Overview: </h4>
            <p>${overview}</p>
        </div>
        <div class="release">
            <h4 class="text-warning">Release Date: </h4>
            <p>${release_date}</p>
        </div>
        
        <button id="fullMovieBtn"></button>
      </section>
    </div>

    <div class="item position-absolute top-0 ">
            <svg width="40" height="40" class="position-absolute">
              <circle id="circle" stroke="${updateVotesAverage(
                vote_average * 10
              )}" stroke-dasharray="${votesPercentage(
    vote_average * 10
  )}" cx="20" cy="20" r="16" fill="none"  stroke-width="5"></circle>
                                  <circle cx="20" cy="20" r="16"  fill="black"></circle>
              <text x="23" y="22" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-weight="bold">
                ${vote_average * 10}<tspan dy="-5" font-size="8">%</tspan>
              </text>
            </svg>

          </div>
  </div> 
  `;
  const  fullMovieBtn = document.getElementById('fullMovieBtn')
  fullMovieBtn.addEventListener('click', () => {
    getMovieFullDetails(id)
    viewTrailer()
    // navigateToDestination(id)
  })
  // Close Movie Details Icon
  const closeIcon = document.querySelector(".close-btn");
  closeIcon.addEventListener("click", closeMovieDetails);

  // Show Movie Details
  movContainer.style.transform = `scale(${1})`;

}

// Exit Movie Details
function closeMovieDetails() {
  movContainer.style.transform = `scale(${0})`;
}

// get Movie Trailers
function getMovieFullDetails(movie_id) {
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`)
    .then((response) => response.json())
    .then((response) => {
      let mov_detail = response;
      const { budget, revenue, tagline, homepage, runtime } =
        mov_detail;
        console.log(mov_detail)
    })
    .catch((err) => console.warn(err.message));   

  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}`
  )
    .then((vidResponse) => vidResponse.json())
    .then((vidResponse) => {
      console.log(vidResponse.results[0].key)
      const video_key = vidResponse.results[0].key
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function viewTrailer(videoKey) {
  window.location.href = `movies.html?videoKey=${videoKey}`
}