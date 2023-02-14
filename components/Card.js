import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/no-image.jpg');
const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation,item} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Details',{movieId:item.id})}>
        <Image
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeholderImage
          }
          resizeMode="cover"
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    // justifyContent: 'center',
    height: 200,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 10,
  },
});

// Card.propTypes = propTypes;
export default Card;
