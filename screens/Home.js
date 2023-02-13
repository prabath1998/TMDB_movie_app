import React, {useEffect, useState} from 'react';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
} from '../services/services';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState('');
  const [popularMovies, setPopularMovies] = useState('');
  const [popularTvs, setPopularTvs] = useState('');
  const [familyMovies, setFamilyMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
          );
        });

        setMoviesImages(moviesImagesArray);
      })
      .catch(err => {
        setError(err);
      });

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        setError(err);
      });

    getPopularTv()
      .then(tvs => {
        setPopularTvs(tvs);
      })
      .catch(err => {
        setError(err);
      });

    getFamilyMovies()
      .then(fmovies => {
        setFamilyMovies(fmovies);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <SliderBox
            images={moviesImages}
            sliderBoxHeight={dimensions.height / 1.5}
            // circleLoop={true}
            autoPlay={true}
            dotStyle={styles.sliderTyle}
          />
        </View>

        <View style={styles.carousel}>
          <List title="Popular Movies" content={popularMovies} />
        </View>

        <View style={styles.carousel}>
          <List title="Popular TV shows" content={popularTvs} />
        </View>

        <View style={styles.carousel}>
          <List title="Family" content={familyMovies} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor:'gold'
  },
  sliderTyle: {
    height: 0,
  },
});

export default Home;
