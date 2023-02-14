import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/no-image.jpg');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
              resizeMode="cover"
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genresText} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                fullStarColor="gold"
                starSize={30}
                disabled={true}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModel}>
              <Video onClose={() => videoShown()}/>
            </View>
          </Modal>
        </View>
      )}

      {!loaded && (
        <ActivityIndicator
          size={'large'}
          color="red"
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 1.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: 'black',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  genresText: {
    marginRight: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
