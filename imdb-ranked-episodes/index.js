const rp = require('request-promise');
const fs = require('fs');

const URI = 'http://omdbapi.com';

const buildOptions = ({ id, season }) => ({
  uri: URI,
  qs: {
    i: id,
    apiKey: process.env.OMDB_API_KEY,
    season,
  },
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
});

const getSeasonEpisodes = ({ id, season }) => {
  const options = buildOptions({ id, season });
  return rp(options);
};

const getTotalSeasons = async ({ id }) => {
  const options = buildOptions({ id });
  return await rp(options)
    .then((res) => res.totalSeasons)
    .catch((e) => {
      console.error(e);
    });
}

const compare = (a, b) => {
  if (a.rating < b.rating) {
    return 1;
  }
  if (a.rating > b.rating) {
    return -1;
  }
  return 0;
}

const parseEpisode = (ep, season) => {
  const { Title: title, Episode: episode, imdbRating } = ep;
  return {
    title,
    season,
    episode,
    rating: parseFloat(imdbRating),
  }
};

const saveFile = (fileName, content) => {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log('File saved');
  })
}

const getRankedEpisodes = async ({ id }) => {
  const totalSeasons = await getTotalSeasons({ id });
  const requests = [];
  for (let i = 1; i <= totalSeasons; i++) {
    requests.push(getSeasonEpisodes({ id, season: i }));
  }
  let seasons = await Promise.all(requests);
  const rankedEpisodes = seasons
    .reduce((acc, seasonInfo) => acc.concat(seasonInfo.Episodes.map((episode) => parseEpisode(episode, seasonInfo.Season))), [])
    .sort(compare);
  saveFile('rankedEpisodes.txt', JSON.stringify(rankedEpisodes, null, 2));
}


getRankedEpisodes({ id: 'tt0411008' });