import React, {useEffect, useState} from 'react';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState('');
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

    // getPopularMovies()
    //   .then(movies => {
    //     setMovie(movies[0]);
    //   })
    //   .catch(err => {
    //     setError(err);
    //   });
  }, []);

  return (
    <View style={styles.sliderContainer}>
      <SliderBox
        images={moviesImages}
        sliderBoxHeight={dimensions.height / 1.5}
        circleLoop={true}
        autoPlay={true}
        dotSTyle={styles.sliderTyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sliderTyle: {
    height: 0,
  },
});

export default Home;
