/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowWidth} from './../components/Dimentions';
import Color from './../components/Colors';
import SearchBar from './../components/SearchBar';

const KeluaranScreen = () => {
  const [store, setStore] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const storedata = async () => {
    try {
      const dts = await AsyncStorage.getItem('Database Catatan Barang');

      if (dts !== null) {
        let dbs = JSON.parse(dts);
        setStore(dbs);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(store);
  };

  useEffect(() => {
    storedata();
  }, []);

  const {totalPrice} = useMemo(() => {
    return dataCart.reduce(
      ({totalQuantity, totalPrice}, {harga, jumlah}) => ({
        totalPrice: totalPrice + parseInt(jumlah) * parseInt(harga),
      }),
      {
        totalQuantity: 0,
        totalPrice: 0,
      },
    );
  }, [dataCart]);

  const checkdatacart = id => {
    const finddata = dataCart.find(e => {
      if (e.key === id) {
        return e;
      }
    });
    return finddata;
  };

  const addQty = index => {
    const newItem = [...dataCart];
    newItem[index].jumlah++;
    setDataCart(newItem);
  };

  const decQty = index => {
    const newItem = [...dataCart];
    if (newItem[index].jumlah <= 1) {
      newItem.splice([index], 1);
      setDataCart(newItem);
    } else {
      newItem[index].jumlah--;
      setDataCart(newItem);
    }
  };

  const handleChoose = id => {
    const findMenu = store.find(e => {
      if (e.key === id) {
        return e;
      }
    });
    const dataWQty = {
      ...findMenu,
      jumlah: 1,
    };
    const check = checkdatacart(id);
    if (check === undefined) {
      setDataCart([...dataCart, dataWQty]);
    } else {
      const itemIndex = dataCart.findIndex(item => item.key === id);
      addQty(itemIndex);
    }
    setStatus(false);
    // setModalVisible(false);
  };

  function _searchFilterFunction(searchText, datas) {
    let newData = [];
    if (searchText !== '') {
      newData = datas.filter(function (item) {
        const itemData = item.value.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.includes(textData);
      });
      setStatus(newData.length !== 0 ? true : false);
      setDataSearch([...newData]);
    } else {
      setDataSearch([...newData]);
      setStatus(false);
    }
  }

  const handleCancel = () => {
    setDataCart([]);
  };

  const writeData = async () => {
    await AsyncStorage.setItem(
      'Database Catatan Barang',
      JSON.stringify(store),
    );
    console.log('sampai write data');
  };

  const updateData = (id, jumlah) => {
    // ganti data
    var indexKe = parseInt(id) - 1;
    // kirim database
    var data = store;
    var oldData = data[indexKe];
    var jumlah = parseInt(oldData['jumlah']) - parseInt(jumlah);
    data[indexKe] = {
      key: oldData['key'],
      value: oldData['value'],
      tipe: oldData['tipe'],
      jumlah: jumlah.toString(),
      harga: oldData['harga'],
    };

    setStore(data);
    // console.log(data);
    writeData();
  };

  const bayar = () => {
    dataCart.forEach(item => {
      updateData(item['key'], item['jumlah']);
    });
    setModalVisible(!modalVisible);
  };

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
      <StatusBar backgroundColor={Color.primary} />
      <SearchBar
        placeholder="Masukkan nama barang"
        onChangeText={value => {
          _searchFilterFunction(value, store);
        }}
      />
      <View style={!status ? styles.resNone : styles.resSearch}>
        {dataSearch.map((e, i) => (
          <TouchableOpacity
            key={i}
            style={styles.cardRes}
            onPress={() => handleChoose(e.key)}>
            <Text>{e.value}</Text>
            <Text>Harga: Rp. {money(e.harga)}</Text>
            <Text>Jumlah: {e.jumlah}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>Transactions</Text>
      <ScrollView style={styles.packCart}>
        {dataCart.length === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Keranjang Kosong</Text>
          </View>
        ) : (
          dataCart.map((e, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.nameItem}>{e.value}</Text>
                </View>
                <View style={styles.packQty}>
                  <TouchableOpacity
                    style={styles.btnDec}
                    onPress={() => decQty(i)}>
                    <Text style={styles.textQty}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.btnDec}>
                    <Text style={styles.textQty}>{e.jumlah}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.btnDec}
                    onPress={() => addQty(i)}>
                    <Text style={styles.textQty}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.price}>{`Rp. ${money(
                  e.harga * e.jumlah,
                )}`}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.packTotal}>
        <View>
          <Text style={styles.titleTotal}>Total</Text>
        </View>
        <View>
          <Text style={styles.titleTotal}>Rp. {money(totalPrice)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.fixToText}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.btnSave}>Checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCancel} onPress={() => handleCancel()}>
        <Text style={styles.textCancel}>Batal</Text>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleModal}>Checkout</Text>
              <View style={styles.bodyModal}>
                {dataCart.map((e, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.cardRes}
                    onPress={() => handleChoose(e.key)}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#000',
                      }}>
                      {e.value}
                    </Text>
                    <Text>Jumlah: {e.jumlah}</Text>
                    <Text>Harga: Rp. {money(e.harga)}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.packTotal}>
                  <View>
                    <Text style={styles.titleTotal}>Total</Text>
                  </View>
                  <View>
                    <Text style={styles.titleTotal}>
                      Rp. {money(totalPrice)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.btnModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                  // onPress={() => {
                  //   updateData();
                  // }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => bayar()}>
                  <Text style={styles.textStyle}>Bayar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  resNone: {
    display: 'none',
  },
  resSearch: {
    width: '94.8%',
    height: 'auto',
    position: 'absolute',
    marginTop: 53,
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
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  modalView: {
    width: '90%',
    height: 'auto',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModal: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyModal: {
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 20,
    width: '40%',
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Color.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnModal: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
    justifyContent: 'space-around',
  },
});

export default KeluaranScreen;
