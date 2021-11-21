/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputForm from './../components/InputForm';
import ButtonForm from './../components/ButtonForm';

const MasukanScreen = () => {
  // {"harga": 5000, "jumlah": 14, "key": "1", "nama": "Dunkin' Donuts", "value": "Dunkin' Donuts", tipe: "makanan"}
  const [warning, setWarning] = useState('Harus Input Nama');
  const [jumlah, setJumlah] = useState(0);
  const [status, setStatus] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [form, setForm] = useState({
    key: '',
    value: '',
    tipe: '',
    jumlah: 0,
    harga: '',
  });

  useEffect(() => {
    AsyncStorage.getItem('Database Catatan Barang', (error, result) => {
      if (result) {
        const data = JSON.parse(result);
        setDataSearch([data]);
      }
    });
    AsyncStorage.getItem('Counter', (error, result) => {
      if (result) {
        setForm({...form, key: result});
      }
    });
  }, []);

  const tulisData = async () => {
    try {
      if (form.value === '') {
        setWarning('Harus Input Nama');
        alert('tester');
      } else {
        const addQty = {
          ...form,
          key: form.key++,
          jumlah: parseInt(form.jumlah) + jumlah,
        };

        await AsyncStorage.setItem(
          'Database Catatan Barang',
          JSON.stringify(addQty),
        );
        // console.log(form);
      }
      // console.log(data);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const changeName = (searchText, datas) => {
    setForm({...form, value: searchText});

    let newData = [];
    if (searchText !== '') {
      newData = datas.filter(function (item) {
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
    let data;
    try {
      data = await AsyncStorage.getItem('Database Catatan Barang');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    console.log(JSON.parse(data));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.text}>Input Data</Text>

        <InputForm label="ID Barang:" value={form.key} editable={false} />
        <InputForm
          label="Nama Barang:"
          placeholder="Masukkan Nama Barang"
          value={form.value}
          onChangeText={event => changeName(event, dataSearch)}
        />
        <Text style={styles.wrn}>{form.value !== '' ? '' : `*${warning}`}</Text>
        <View style={!status ? styles.resNone : styles.resSearch}>
          {dataSearch.map((e, i) => (
            <TouchableOpacity
              key={i}
              style={styles.cardRes}
              onPress={() => handleChoose(e.key)}>
              <Text>{e.value}</Text>
              <Text>Price: {e.harga}</Text>
              <Text>Qty: {e.jumlah}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <InputForm
          label="Tipe Barang:"
          placeholder="Masukkan Tipe Barang"
          value={form.tipe}
          onChangeText={value => setForm({...form, tipe: value})}
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
          onChangeText={value => setForm({...form, harga: value})}
          keyboardType="numeric"
        />

        <View style={{height: 15}} />

        <ButtonForm label="Simpan" onPress={() => tulisData()} />
        <ButtonForm label="Cancel" />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  resNone: {
    display: 'none',
  },
  resSearch: {
    display: 'flex',
    width: '94.8%',
    height: 'auto',
    position: 'absolute',
    marginTop: 195,
    zIndex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  cardRes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrn: {
    color: 'red',
  },
});

export default MasukanScreen;
