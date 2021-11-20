import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon, { Icons } from "./../components/Icons";
import { windowHeight, windowWidth } from "./../components/Dimentions";
import Color from "./../components/Colors";
import SearchBar from "./../components/SearchBar";

const CatatanScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar placeholder="Masukkan nama barang yang dicari" />
      <View style={styles.listContainer} />
    </View>
  );
};

export default CatatanScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  listContainer: {},
});
