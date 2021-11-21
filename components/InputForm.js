import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Color from "./../components/Colors";

const InputForm = ({ label, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <View style={styles.packName}>
        <Text style={styles.labelName}>
          {label}
        </Text>
        <TextInput
          style={[isFocused ? styles.inputNameFocused : styles.inputName]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  packName: {
    marginTop: 15,
    marginBottom: 15,
  },
  labelName: {
    fontSize: 18,
    color: "black",
  },
  inputName: {
    height: 40,
    width: 320,
    borderBottomWidth: 1,
    borderColor: "#999",
  },
  inputNameFocused: {
    height: 40,
    width: 320,
    borderBottomWidth: 1,
    borderColor: Color.primary,
  },
});
