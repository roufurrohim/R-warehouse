import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { windowWidth, windowHeight } from "./../components/Dimentions";
import Icon, { Icons } from "./../components/Icons";
import Color from "./../components/Colors";
import SearchBar from "./../components/SearchBar";

const KeluaranScreen = () => {
  const [text, setText] = useState("");
  const [store, setStore] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataCart, setDataCart] = useState([]);

  const storedata = async () => {
    try {
      const dts = await AsyncStorage.getItem("Database Catatan Barang");
      if (dts !== null) {
        let dbs = JSON.parse(dts);
        setStore([dbs]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    storedata();
  }, []);

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
      if (e.key === id.key) {
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
  };

  function _searchFilterFunction(searchText, datas) {
    let newData = [];
    if (searchText !== "") {
      newData = datas.filter(function(item) {
        const itemData = item.value.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.includes(textData);
      });
      setDataSearch([...newData]);
    } else {
      setDataSearch([...newData]);
    }
  }

  const handleCancel = () => {
    setDataCart([]);
  };

  // format money
  const money = num => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
      <View style={dataSearch.length === 0 ? styles.resNone : styles.resSearch}>
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
              Harga: Rp. {money(e.harga)}
            </Text>
            <Text>
              Jumlah: {e.jumlah}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>Transactions</Text>
      <ScrollView style={styles.packCart}>
        {dataCart.length === 0
          ? <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Keranjang Kosong</Text>
            </View>
          : dataCart.map((e, i) =>
              <View key={i} style={styles.card}>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.nameItem}>
                      {e.value}
                    </Text>
                  </View>
                  <View style={styles.packQty}>
                    <TouchableOpacity
                      style={styles.btnDec}
                      onPress={() => decQty(i)}
                    >
                      <Text style={styles.textQty}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.btnDec}>
                      <Text style={styles.textQty}>
                        {e.jumlah}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.btnDec}
                      onPress={() => addQty(i)}
                    >
                      <Text style={styles.textQty}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.price}>{`Rp. ${money(
                    e.harga * e.jumlah
                  )}`}</Text>
                </View>
              </View>
            )}
      </ScrollView>
      <View style={styles.packTotal}>
        <View>
          <Text style={styles.titleTotal}>Total</Text>
        </View>
        <View>
          <Text style={styles.titleTotal}>
            Rp. {money(24546567)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.fixToText}
        // onPress={() => Alert.alert('Right button pressed')}
      >
        <Text style={styles.btnSave}>Checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCancel} onPress={() => handleCancel()}>
        <Text style={styles.textCancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  resNone: {
    display: "none",
  },
  resSearch: {
    width: "94.8%",
    height: "auto",
    position: "absolute",
    marginTop: 53,
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
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "column",
    marginLeft: 10,
  },
  nameItem: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  packQty: {
    width: 50,
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  btnDec: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  textQty: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  packTotal: {
    width: 280,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleTotal: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  fixToText: {
    marginTop: 30,
    width: 300,
    height: 45,
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnCancel: {
    marginTop: 20,
    width: 300,
    height: 45,
    borderWidth: 1,
    borderColor: Color.primary,
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
    color: Color.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default KeluaranScreen;
