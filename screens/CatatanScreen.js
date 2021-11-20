import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon, { Icons } from "./../components/Icons";
import { windowHeight, windowWidth } from "./../components/Dimentions";
import Color from "./../components/Colors";

const CatatanScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Icon
            type={Icons.Feather}
            name={"search"}
            color={Color.primary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBarInput}
            onChange={() => {}}
            placeholder="Masukkan nama barang yang dicari"
          />
        </View>
      </View>
    </View>
  );
};

export default CatatanScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  searchBarContainer: {
    height: 80,
    width: "100%",
    backgroundColor: Color.primary,
    justifyContent: "center",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: Color.white,
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarInput: {
    fontSize: 16,
  },
});
