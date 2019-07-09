// HEader component for top of app
// Import libraries for making component
import React from 'react';
import { Text, View } from 'react-native';

// Make component
const Header = (props) => {
  // Reference the style created below
  const { textStyle, viewStyle } = styles; 

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
}; 

// Styles 
const styles = {
  viewStyle: {
    backgroundColor: '#E1F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    elevation: 2,
    postition: 'relative',
  },
  textStyle: {
    fontSize: 20,

  }
};

// Make component available to other parts of app
export { Header };