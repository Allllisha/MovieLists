puts 'Clearing database...'


puts 'Generating movies...'
page_number = 0

loop do
  page_number += 1
  url = "https://api.themoviedb.org/3/movie/popular?api_key=1c993de64da6e820708b0ec2dd279961&language=en-US&page=#{page_number.to_s}"
  
  movies = URI.open(url).read
  movie = JSON.parse(movies)
  movie_results = movie['results']
  movie_poster = "https://image.tmdb.org/t/p/w500"

  movie_results.each do |movie|
  new_movie = Movie.create(title: movie['title'], 
                           overview: movie['overview'], 
                           poster_url: movie_poster + movie['poster_path'], 
                           rating: movie['vote_average'].to_f)
  puts "#{new_movie.title} has been created!"
  end

  if page_number == 1000
    break
  end
end

puts "#{Movie.count}"


puts 'Generating Genres...'
require 'open-uri'
require 'json'

buffer = open('https://api.themoviedb.org/3/genre/movie/list?api_key=1c993de64da6e820708b0ec2dd279961&language=en-US').read
result = JSON.parse(buffer)

result["genres"].each do |genre|
 puts (genre)
 genre = Genre.new 
 genre.id = genre["id"]
 genre.name = genre["name"]
 genre.save
 puts("Add genres #{genre["name"]}")
end

puts "Done ..." 
