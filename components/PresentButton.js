import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const PresentButton = (props) => {
    return(
        <View style={styles.button}>
            <TouchableOpacity onPress={() => props.onPress()}>      
                <Text style={styles.text}>Mark as present</Text>
            </TouchableOpacity>            
	    </View>
 
     
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 0,

        margin: 10,
        height: 60,

        borderRadius: 10,
        backgroundColor: '#ffcc33',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 28,
        fontWeight: '900'
    }
});

export default PresentButton;
