import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieOrTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieOrTv(query, 'movie'), searchMovieOrTv(query, 'tv')])

      .then(([movies, tv]) => {
        const data = [...movies, tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              value={text}
              onChangeText={onChangeText}
              style={styles.input}
              placeholder={'Search movie or Tv'}></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              key={item => item.id}
            />
          )}

          {searchResults && searchResults.length == 0 && (
            <View style={[styles.empty, {paddingTop: 20}]}>
              <Text>No results found!</Text>
            </View>
          )}

          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 8,

    borderWidth: 1,
    borderRadius: 15,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {},
  empty: {},
});

export default Search;
