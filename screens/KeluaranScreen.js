import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {windowWidth, windowHeight} from './../components/Dimentions';
import Icon, {Icons} from './../components/Icons';
import Color from './../components/Colors';

const KeluaranScreen = () => {
  const [text, setText] = useState('');

  const data = [
    {
      id: 1,
      name: 'KFC',
      price: 100,
      qty: 1,
    },
    {
      id: 2,
      name: 'Taco Bell',
      price: 1000,
      qty: 1,
    },
    {
      id: 3,
      name: "Andy Capp's fries",
      price: 100,
      qty: 1,
    },
    {
      id: 4,
      name: "Andy Capp's fries",
      price: 100,
      qty: 1,
    },
  ];

  // format money
  const money = num => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
      return num;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Icon
            type={Icons.Feather}
            name={'search'}
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
      <Text style={styles.title}>Transactions</Text>
      <ScrollView style={styles.packCart}>
        {data.map((e, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.nameItem}>{e.name}</Text>
              </View>
              <View style={styles.packQty}>
                <TouchableOpacity style={styles.btnDec}>
                  <Text style={styles.textQty}>-</Text>
                </TouchableOpacity>
                <View style={styles.btnDec}>
                  <Text style={styles.textQty}>{e.qty}</Text>
                </View>
                <TouchableOpacity style={styles.btnDec}>
                  <Text style={styles.textQty}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.price}>{`Rp. ${money(e.price * 20)}`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.packTotal}>
        <View>
          <Text style={styles.titleTotal}>Total</Text>
        </View>
        <View>
          <Text style={styles.titleTotal}>Rp. {money(24546567)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.fixToText}>
        <Text
          style={styles.btnSave}
          // title="Save"
          // onPress={() => Alert.alert('Right button pressed')}
        >
          Checkout
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCancel}>
        <Text
          style={styles.textCancel}
          // onPress={() => Alert.alert('Left button pressed')}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchBarContainer: {
    height: 80,
    width: '100%',
    backgroundColor: Color.primary,
    justifyContent: 'center',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarInput: {
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  inputName: {
    height: 40,
    width: 320,
    borderBottomWidth: 1,
  },
  packCart: {
    marginTop: 20,
    paddingTop: 20,
    width: windowWidth - 33,
    height: windowWidth - 33,
  },
  card: {
    width: 300,
    height: 100,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Color.primary,
    marginHorizontal: 30,
    marginVertical: 7.5,
    padding: 15,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  nameItem: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  packQty: {
    width: 50,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnDec: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textQty: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  packTotal: {
    width: 280,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTotal: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  fixToText: {
    marginTop: 30,
    width: 300,
    height: 45,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnCancel: {
    marginTop: 20,
    width: 300,
    height: 45,
    borderWidth: 1,
    borderColor: Color.primary,
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
    color: Color.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default KeluaranScreen;
