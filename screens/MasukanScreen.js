import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {windowWidth, windowHeight} from './../components/Dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './../components/Colors';
import InputForm from './../components/InputForm';

const MasukanScreen = () => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  // {"harga": 5000, "jumlah": 14, "key": "1", "nama": "Dunkin' Donuts", "value": "Dunkin' Donuts", tipe: "makanan"}
  const [form, setForm] = useState({
    value: '',
    tipe: '',
    jumlah: '',
    harga: '',
  });

  var data = [];
  console.log(form);
  const tulisData = async () => {
    try {
      await AsyncStorage.setItem(
        'Database Catatan Barang',
        JSON.stringify(data),
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    console.log('tulis data selesai');
  };

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
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Text style={styles.text}>Input Data</Text>

        <InputForm label="ID Barang:" value="1" editable={false} />
        <InputForm
          label="Nama Barang:"
          placeholder="Masukkan Nama Barang"
          onChangeText={value => setForm({...form, value: value})}
        />
        <InputForm
          label="Tipe Barang:"
          placeholder="Masukkan Tipe Barang"
          onChangeText={value => setForm({...form, tipe: value})}
        />
        <InputForm
          label="Jumlah Barang:"
          placeholder="Masukkan Jumlah Barang Per Karton"
          onChangeText={value => setForm({...form, jumlah: value})}
          keyboardType="numeric"
        />
        <InputForm
          label="Harga Barang:"
          placeholder="Masukkan Harga Barang"
          onChangeText={value => setForm({...form, harga: value})}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.fixToText}
          onPress={() => {
            tulisData();
          }}>
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
          }}>
          <Text style={styles.textCancel}>Cancel</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fixToText: {
    marginTop: 50,
    width: 300,
    height: 45,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnCancel: {
    marginTop: 50,
    width: 300,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnSave: {
    display: 'flex',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textCancel: {
    display: 'flex',
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    width: windowWidth - 50,
    height: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
});

export default MasukanScreen;
