import React from 'react'
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';


const propTypes = {
    errorText1: PropTypes.string,
    errorText2: PropTypes.string,
}

const defaultProps = {
    errorText1:'Oops! Something went wrong.',
    errorText2:'Make sure you are online and restart the app.',
};

class Error extends React.PureComponent {
    
    render() {
        const {errorText1, errorText2} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{errorText1}</Text>
                <Text style={styles.text}>{errorText2}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        flex:1
    },
    text:{
        color:'#000',
        fontWeight:'bold'
    }
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;