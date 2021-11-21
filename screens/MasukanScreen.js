import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Keyboard,
} from "react-native";
import { windowWidth, windowHeight } from "./../components/Dimentions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "./../components/Colors";
import InputForm from "./../components/InputForm";
import ButtonForm from "./../components/ButtonForm";

const MasukanScreen = () => {
  const [warning, setWarning] = useState("Harus Memasukkan Nama Barang");
  const [status, setStatus] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [form, setForm] = useState({
    key: "",
    value: "",
    tipe: "",
    jumlah: "",
    harga: "",
  });
  const [semuaData, setSemuaData] = useState([]);
  const [isDataBaru, setIsDataBaru] = useState(true);
  const notInitialRender = useRef(false);

  const alertModal = (title, message) =>
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const validation = () => {
    if (
      form.value != "" &&
      form.tipe != "" &&
      form.jumlah != "" &&
      form.harga != ""
    ) {
      return true;
    } else {
      return false;
    }
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
    setIsDataBaru(true);
  };

  const writeData = async () => {
    await AsyncStorage.setItem(
      "Database Catatan Barang",
      JSON.stringify(semuaData)
    );
    console.log("sampai write data");
  };

  const counter = async () => {
    var counter = parseInt(form["key"]) + 1;
    await AsyncStorage.setItem("Counter", counter.toString());
  };

  const updateData = () => {
    // ganti data
    var indexKe = parseInt(form["key"]) - 1;
    // kirim database
    var data = semuaData;
    var jumlah =
      parseInt(semuaData[indexKe]["jumlah"]) + parseInt(form["jumlah"]);
    data[indexKe] = {
      key: form["key"],
      value: form["value"],
      tipe: form["tipe"],
      jumlah: jumlah.toString(),
      harga: form["harga"],
    };

    setSemuaData(data);
    console.log(semuaData);
    writeData();
  };

  const tulisData = () => {
    if (validation()) {
      if (isDataBaru) {
        setSemuaData([...semuaData, form]);
        counter();
      } else {
        updateData();
      }

      alertModal("", "Input Data berhasil");
      clearData();
    } else {
      alertModal("", "Mohon Masukkan Data Secara Lengkap");
    }
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
      setDataSearch([...newData]);
    } else {
      setStatus(false);
    }
  };

  const handleChoose = item => {
    Keyboard.dismiss();
    setForm({
      key: item.key,
      value: item.value,
      tipe: item.tipe,
      jumlah: "",
      harga: item.harga,
    });
    setStatus(false);
    setIsDataBaru(false);
  };

  const readData = async () => {
    try {
      var data = await AsyncStorage.getItem("Database Catatan Barang");
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
          placeholder="Masukkan Nama Barang"
          value={form.value}
          onChangeText={event => changeName(event, semuaData)}
        />
        <Text style={styles.wrn}>
          {form.value !== "" ? "" : `*${warning}`}
        </Text>
        <View style={!status ? styles.resNone : styles.resSearch}>
          {dataSearch.map((e, i) =>
            <TouchableOpacity
              key={i}
              style={styles.cardRes}
              onPress={() => handleChoose(e)}
            >
              <Text>
                {e.value}
              </Text>
              <Text>
                Harga: {e.harga}
              </Text>
              <Text>
                Sisa: {e.jumlah}
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
          value={form.jumlah}
          onChangeText={value => setForm({ ...form, jumlah: value })}
          keyboardType="numeric"
        />
        <InputForm
          label="Harga Barang:"
          placeholder="Masukkan Harga Per Karton"
          value={form.harga}
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
    marginLeft: 15,
  },
});

export default MasukanScreen;
