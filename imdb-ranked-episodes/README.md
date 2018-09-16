# imdb-ranked-episodes

Gets all episodes of a TV show in IMDb sorted by rating

IMDb has a 'Top-Rated Episodes' page (https://imdb.to/2NJZXcJ) that shows all episodes of a TV show sorted by rating, but for some reason it doesn't show the episode's number and season, just its title (at least at the moment I am writing this). So I decided to write this small script that gets all episodes of a TV show in IMDb sorted by rating and saves them to a .txt file (with episode's number and season information for God's sake). I particularly chose not to use any of those IMDb APIs available out there for Node, just to practice some concepts like HTTP requests, async functions and array methods.
