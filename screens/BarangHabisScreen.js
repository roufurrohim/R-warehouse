import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "./../components/Dimentions";
import SearchBar from "./../components/SearchBar";
import { AlphabetList } from "react-native-section-alphabet-list";

const data = [
  {
    value: "Dunkin' Donuts",
    key: "85",
    harga: "9843",
  },
  {
    value: "Soprole",
    key: "86",
    harga: "6669",
  },
  {
    value: "Nutella",
    key: "87",
    harga: "9916",
  },
  {
    value: "Kinder",
    key: "88",
    harga: "7577",
  },
  {
    value: "Subway",
    key: "89",
    harga: "6972",
  },
  {
    value: "Vitta Foods",
    key: "90",
    harga: "6196",
  },
  {
    value: "KFC",
    key: "91",
    harga: "3293",
  },
  {
    value: "Wendy's",
    key: "92",
    harga: "3115",
  },
  {
    value: "Burger King",
    key: "93",
    harga: "6112",
  },
  {
    value: "Dunkin' Donuts",
    key: "94",
    harga: "3532",
  },
  {
    value: "Taco Bell",
    key: "95",
    harga: "6180",
  },
  {
    value: "Heinz",
    key: "96",
    harga: "3802",
  },
  {
    value: "Wonder Bread",
    key: "97",
    harga: "7697",
  },
  {
    value: "Bel Group",
    key: "98",
    harga: "4174",
  },
  {
    value: "Andy Capp's fries",
    key: "99",
    harga: "4765",
  },
  {
    value: "Dunkin' Donuts",
    key: "100",
    harga: "9353",
  },
];

const BarangHabisScreen = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Minimum jumlah barang"
        keyboardType="number-pad"
        onChangeText={value => {
          setInput(value);
          if (value != "") {
            setIsSearch(true);
          } else {
            setIsSearch(false);
          }
        }}
      />
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Nama Barang</Text>
          <Text style={styles.listHeaderText}>Jumlah</Text>
        </View>
        <View
          style={{ height: 1, backgroundColor: "#bbb", marginBottom: 15 }}
        />
        <View
          style={{
            justifyContent: "center",
            height: 580,
          }}
        >
          {isSearch
            ? <AlphabetList
                style={{ height: 580 }}
                data={data}
                indexLetterStyle={{
                  color: "rgba(0,0,0,0)",
                  fontSize: 15,
                }}
                renderCustomItem={item =>
                  <View style={styles.listItemContainer}>
                    <Text style={styles.listItemLabel}>
                      {item.value}
                    </Text>
                    <Text style={styles.listItemLabel}>
                      {item.harga}
                    </Text>
                  </View>}
                renderCustomSectionHeader={section =>
                  <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeaderLabel}>
                      {section.title}
                    </Text>
                  </View>}
              />
            : <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  margin: 50,
                  color: "#aaa",
                }}
              >
                Masukkan jumlah minimum barang terlebih dahulu
              </Text>}
        </View>
      </View>
    </View>
  );
};

export default BarangHabisScreen;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  listContainer: {
    flexDirection: "column",
    padding: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // left: 20,
    // backgroundColor: "yellow",
  },
  listHeaderText: {
    fontSize: 20,
    // backgroundColor: "red",
  },
  sectionHeaderContainer: {
    backgroundColor: "#bbb",
  },
  sectionHeaderLabel: {
    fontSize: 20,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemLabel: {
    fontSize: 20,
  },
});
