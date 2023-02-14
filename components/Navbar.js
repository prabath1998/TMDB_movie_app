import React from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';


const defaultProps = {
  main: false,
};

const propTypes = {
  main: PropTypes.bool,
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image style={styles.logo} source={require('../assets/images/movie.png')}/>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search-outline'} size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* <Text>{'movie app'}</Text> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
   logo:{
    width:50,
    height:50,
   },
   mainNav:{
    flexDirection:'row',
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10
   }
  });

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
