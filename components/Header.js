import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return(
        <View style={styles.header}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffcc33',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 28,
        fontWeight: '900'
    }
});

export default Header;