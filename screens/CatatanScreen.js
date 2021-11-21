import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { windowHeight, windowWidth } from "./../components/Dimentions";
import SearchBar from "./../components/SearchBar";
import { AlphabetList } from "react-native-section-alphabet-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "./../components/Colors";

const CatatanScreen = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const getData = async () => {
    var databaseJson = [];
    var database = await AsyncStorage.getItem("Database Catatan Barang");
    databaseJson = JSON.parse(database);
    setData(databaseJson);
    // console.log(databaseJson);
  };

  const filterData = () => {
    var hasil = [];
    data.forEach(item => {
      if (item["nama"].toLowerCase().includes(input.toLowerCase())) {
        hasil.push(item);
      }
    });
    setFilteredData(hasil);
  };

  useEffect(
    () => {
      filterData();
    },
    [input]
  );

  useEffect(() => {
    async function fetchData() {
      // You can await here
      getData();
      // ...
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.primary} />
      <SearchBar
        placeholder="Masukkan nama barang yang dicari"
        onChangeText={val => {
          setInput(val);
          if (val != "") {
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
        <View style={{ bottom: 0 }}>
          <AlphabetList
            style={{ height: 580 }}
            data={isSearch ? filteredData : data}
            indexLetterStyle={{
              color: "rgba(0,0,0,0)",
              fontSize: 15,
            }}
            renderCustomItem={item =>
              <View style={styles.listItemContainer}>
                <Text style={styles.listItemLabel}>
                  {item.value}
                </Text>
                <Text
                  style={[
                    styles.listItemLabel,
                    { width: 50, textAlign: "center" },
                  ]}
                >
                  {item.jumlah}
                </Text>
              </View>}
            renderCustomSectionHeader={section =>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderLabel}>
                  {section.title}
                </Text>
              </View>}
          />
        </View>
      </View>
    </View>
  );
};

export default CatatanScreen;

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
  },
  listHeaderText: {
    fontSize: 20,
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
