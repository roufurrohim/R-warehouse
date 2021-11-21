import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
} from "react-native";
import { windowWidth, windowHeight } from "./../components/Dimentions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "./../components/Colors";
import InputForm from "./../components/InputForm";
import ButtonForm from "./../components/ButtonForm";

const MasukanScreen = () => {
  const [form, setForm] = useState({
    key: "",
    value: "",
    tipe: "",
    jumlah: "",
    harga: "",
  });
  const [semuaData, setSemuaData] = useState([]);
  const notInitialRender = useRef(false);

  const alertModal = (title, message) =>
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const cekData = () => {
    console.log(semuaData);
  };

  const clearData = async () => {
    try {
      var counter = await AsyncStorage.getItem("Counter");
      var nullData = {
        key: counter,
        value: "",
        tipe: "",
        jumlah: "",
        harga: "",
      };
    } catch (e) {
      console.log(e);
    }
    setForm(nullData);
  };

  const writeData = async () => {
    await AsyncStorage.setItem(
      "Database Catatan Barang",
      JSON.stringify(semuaData)
    );
  };

  const counter = async () => {
    var counter = parseInt(form["key"]) + 1;
    await AsyncStorage.setItem("Counter", counter.toString());
  };

  const tulisData = () => {
    setSemuaData([...semuaData, form]);
    writeData();
    counter();

    alertModal("", "Input Data berhasil");
    clearData();
  };

  const readData = async () => {
    try {
      var data = await AsyncStorage.getItem("Database Catatan Barang");
      console.log(data);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    setSemuaData(JSON.parse(data));
  };

  useEffect(
    () => {
      if (notInitialRender.current) {
        writeData();
        console.log("masuk useEffect");
      } else {
        notInitialRender.current = true;
      }
    },
    [semuaData]
  );

  useEffect(() => {
    async function fetchData() {
      // ambil data counter
      try {
        // await AsyncStorage.setItem("Database Catatan Barang", "[]");
        // await AsyncStorage.setItem("Counter", "1");
        var counter = await AsyncStorage.getItem("Counter");
        setForm({ ...form, key: counter });
      } catch (e) {
        console.log(e);
      }
      // ambil semua data gudang
      readData();
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.primary} />
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.text}>Input Data</Text>

        <InputForm label="ID Barang:" value={form.key} editable={false} />
        <InputForm
          label="Nama Barang:"
          value={form["value"]}
          placeholder="Masukkan Nama Barang"
          onChangeText={value => setForm({ ...form, value: value })}
        />
        <InputForm
          label="Tipe Barang:"
          value={form["tipe"]}
          placeholder="Masukkan Tipe Barang"
          onChangeText={value => setForm({ ...form, tipe: value })}
        />
        <InputForm
          label="Jumlah Barang:"
          value={form["jumlah"]}
          placeholder="Masukkan Jumlah Barang Per Karton"
          onChangeText={value => setForm({ ...form, jumlah: value })}
          keyboardType="number-pad"
        />
        <InputForm
          label="Harga Barang:"
          value={form["harga"]}
          placeholder="Masukkan Harga Barang"
          onChangeText={value => setForm({ ...form, harga: value })}
          keyboardType="numeric"
        />

        <View style={{ height: 15 }} />

        <ButtonForm
          label="Simpan"
          onPress={() => {
            tulisData();
          }}
        />
        <ButtonForm
          label="Cancel"
          onPress={() => {
            clearData();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MasukanScreen;
