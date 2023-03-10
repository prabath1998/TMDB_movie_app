import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.array
}

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            renderItem={({item}) => <Card item={item} navigation={navigation}/>}
            horizontal={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.lightGray,
    padding:10,
    paddingBottom: 15
  },
  list: {
    marginTop: 30,
  },
});

List.propTypes = propTypes;

export default List;
