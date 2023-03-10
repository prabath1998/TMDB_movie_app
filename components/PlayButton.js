import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../themes/Colors';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Icon name={'caret-forward-outline'} size={30} color={Colors.white}/>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    padding: 10,
    width:50,
    backgroundColor:Colors.primary,
    borderRadius:50
    
  },
});

export default PlayButton;
