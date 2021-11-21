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
import InputForm from "./../components/InputForm";

const MasukanScreen = () => {
  // const [form, setForm] = useState({
  //   nameItem: "",
  // });

  var data = [];

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
      <InputForm label="ID Barang:" value="1" editable={false} />
      <InputForm label="Nama Barang:" placeholder="Masukkan Nama Barang" />
      <InputForm label="Tipe Barang:" placeholder="Masukkan Tipe Barang" />
      <InputForm label="Jumlah Barang:" placeholder="Masukkan Jumlah Barang" />
      <InputForm label="Harga Barang:" placeholder="Masukkan Harga Barang" />
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
