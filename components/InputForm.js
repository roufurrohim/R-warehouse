/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Color from './../components/Colors';
import {windowWidth, windowHeight} from './../components/Dimentions';

const InputForm = ({label, ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={[isFocused ? styles.inputFocused : styles.inputUnfocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 18,
    color: 'black',
    width: windowWidth - 75,
  },
  inputUnfocused: {
    height: 40,
    // width: 320,
    width: windowWidth - 75,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  inputFocused: {
    height: 40,
    // width: 320,
    width: windowWidth - 75,
    borderBottomWidth: 1,
    borderColor: Color.primary,
  },
});
