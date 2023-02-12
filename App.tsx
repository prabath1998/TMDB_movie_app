import axios from 'axios';
import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';

const getPopularMovies = async() => {
  const response =await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0b22772c0a7b5f9604f2cf1eef2af55a');
  return response.data.results;
  
};

const App = () => {

  const [title,setTitle] = useState('Title');

  
  getPopularMovies().then(movies => {
    setTitle(movies[0].original_title);
    
  });
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default App;
