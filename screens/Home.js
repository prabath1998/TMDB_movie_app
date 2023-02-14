import React, {useEffect, useState} from 'react';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import Colors from '../themes/Colors';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvs, setPopularTvs] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvsData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTvs(popularTvsData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !error &&(
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensions.height / 1.5}
                // circleLoop={true}
                autoPlay={true}
                dotStyle={styles.sliderTyle}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List title="Popular Movies" content={popularMovies} navigation={navigation}/>
            </View>
          )}

          {popularTvs && (
            <View style={styles.carousel}>
              <List title="Popular TV shows" content={popularTvs} navigation={navigation}/>
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List title="Family Movies" content={familyMovies} navigation={navigation}/>
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List title="Documentary Movies" content={documentaryMovies} navigation={navigation}/>
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && (
        <ActivityIndicator
          size={'large'}
          color="red"
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        />
      )}
      {error && <Error />}
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
    backgroundColor:Colors.background,
  },
  sliderTyle: {
    height: 0,
  },
});

export default Home;
