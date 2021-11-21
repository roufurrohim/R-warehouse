import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { windowWidth, windowHeight } from "./../components/Dimentions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "./../components/Colors";
import InputForm from "./../components/InputForm";
import ButtonForm from "./../components/ButtonForm";

const MasukanScreen = () => {
  const [warning, setWarning] = useState("Harus Input Nama");
  const [jumlah, setJumlah] = useState(0);
  const [status, setStatus] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [form, setForm] = useState({
    key: "",
    value: "",
    tipe: "",
    jumlah: 0,
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
        jumlah: 0,
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

  const changeName = (searchText, datas) => {
    setForm({ ...form, value: searchText });

    let newData = [];
    if (searchText !== "") {
      newData = datas.filter(function(item) {
        const itemData = item.value.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.includes(textData);
      });
      setStatus(newData.length !== 0 ? true : false);
      console.log(newData);
      setDataSearch([...newData]);
    } else {
      setStatus(false);
    }
  };

  const handleChoose = id => {
    const findMenu = dataSearch.find(e => {
      if (e.key === id) {
        return e;
      }
    });
    setForm(findMenu);
    setStatus(false);
  };
  console.log(form);
  // eslint-disable-next-line no-unused-vars
  const readData = async () => {
    try {
      var data = await AsyncStorage.getItem("Database Catatan Barang");
      // console.log(data);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    setSemuaData(JSON.parse(data));
    setDataSearch(JSON.parse(data));
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
          value={form.value}
          onChangeText={event => changeName(event, dataSearch)}
        />
        <Text style={styles.wrn}>
          {form.value !== "" ? "" : `*${warning}`}
        </Text>
        <View style={!status ? styles.resNone : styles.resSearch}>
          {dataSearch.map((e, i) =>
            <TouchableOpacity
              key={i}
              style={styles.cardRes}
              onPress={() => handleChoose(e.key)}
            >
              <Text>
                {e.value}
              </Text>
              <Text>
                Price: {e.harga}
              </Text>
              <Text>
                Qty: {e.jumlah}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <InputForm
          label="Tipe Barang:"
          value={form["tipe"]}
          placeholder="Masukkan Tipe Barang"
          value={form.tipe}
          onChangeText={value => setForm({ ...form, tipe: value })}
        />
        <InputForm
          label="Jumlah Barang:"
          placeholder="Masukkan Jumlah Per Karton"
          onChangeText={value => setJumlah(parseInt(value))}
          keyboardType="numeric"
        />
        <InputForm
          label="Harga Barang:"
          placeholder="Masukkan Harga Per Karton"
          value={form.harga.toString()}
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
  resNone: {
    display: "none",
  },
  resSearch: {
    display: "flex",
    width: "94.8%",
    height: "auto",
    position: "absolute",
    marginTop: 195,
    zIndex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  cardRes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  wrn: {
    color: "red",
  },
});

export default MasukanScreen;
