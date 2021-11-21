import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { windowWidth, windowHeight } from "./../components/Dimentions";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "./../components/Colors";

const MasukanScreen = () => {
  const [form, setForm] = useState({
    nameItem: "",
  });

  var data = [
    {
      nama: "Dunkin' Donuts",
      value: "Dunkin' Donuts",
      key: "1",
      harga: 5000,
      jumlah: 14,
    },
    {
      nama: "Soprole",
      value: "Soprole",
      key: "2",
      harga: 6000,
      jumlah: 3,
    },
    {
      nama: "Nutella",
      value: "Nutella",
      key: "3",
      harga: 4000,
      jumlah: 1,
    },
    {
      nama: "Kinder",
      value: "Kinder",
      key: "4",
      harga: 3000,
      jumlah: 10,
    },
    {
      nama: "Subway",
      value: "Subway",
      key: "5",
      harga: 15000,
      jumlah: 21,
    },
    {
      nama: "Vitta Foods",
      value: "Vitta Foods",
      key: "6",
      harga: 12000,
      jumlah: 11,
    },
    {
      nama: "KFC",
      value: "KFC",
      key: "7",
      harga: 15000,
      jumlah: 6,
    },
    {
      nama: "Wendy's",
      value: "Wendy's",
      key: "8",
      harga: 1000,
      jumlah: 9,
    },
    {
      nama: "Burger King",
      value: "Burger King",
      key: "9",
      harga: 9000,
      jumlah: 3,
    },
  ];

  const tulisData = async () => {
    try {
      await AsyncStorage.setItem(
        "Database Catatan Barang",
        JSON.stringify(data)
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    console.log("tulis data selesai");
  };

  const readData = async () => {
    let data;
    try {
      data = await AsyncStorage.getItem("Database Catatan Barang");
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    console.log(JSON.parse(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input Data</Text>
      <View style={styles.packName}>
        <Text style={styles.labelName}>Name:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Item"
        />
      </View>
      <View style={styles.packType}>
        <Text style={styles.labelName}>Type:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Type"
        />
      </View>
      <View style={styles.packType}>
        <Text style={styles.labelName}>Quantity:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Quantity"
        />
      </View>
      <View style={styles.packType}>
        <Text style={styles.labelName}>Price:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Price"
        />
      </View>
      <TouchableOpacity
        style={styles.fixToText}
        onPress={() => {
          tulisData();
        }}
      >
        <Text
          style={styles.btnSave}
          // title="Save"
        >
          Save
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCancel}
        onPress={() => {
          readData();
        }}
      >
        <Text style={styles.textCancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 30,
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },
  packName: {
    marginTop: 30,
    marginBottom: 20,
  },
  packType: {
    marginTop: 10,
    marginBottom: 20,
  },
  labelName: {
    fontSize: 18,
    color: "black",
  },
  inputName: {
    height: 40,
    width: 320,
    borderBottomWidth: 1,
  },
  fixToText: {
    marginTop: 50,
    width: 300,
    height: 45,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnCancel: {
    marginTop: 50,
    width: 300,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnSave: {
    display: "flex",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  textCancel: {
    display: "flex",
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    width: windowWidth - 50,
    height: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "white",
  },
});

export default MasukanScreen;
