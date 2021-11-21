import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { windowWidth, windowHeight } from "./../components/Dimentions";
import Color from "./../components/Colors";
import Icon, { Icons } from "./../components/Icons";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.primary} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Barang Masuk</Text>
          <View
            style={{
              width: "74%",
              height: 3,
              backgroundColor: "white",
              borderRadius: 3,
            }}
          />
          <Icon
            type={Icons.Feather}
            name={"shopping-bag"}
            color={Color.black}
            style={styles.boxIcon}
          />
          <Text style={styles.boxText}>
            Bulan ini terjadi Transaksi sebanyak:
          </Text>
          <Text style={styles.boxJumlah}>20x (Rp. 500.000)</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Barang Keluar</Text>
          <View
            style={{
              width: "72%",
              height: 3,
              backgroundColor: "white",
              borderRadius: 3,
            }}
          />
          <Icon
            type={Icons.Feather}
            name={"shopping-cart"}
            color={Color.black}
            style={styles.boxIcon}
          />
          <Text style={styles.boxText}>
            Bulan ini terjadi Transaksi sebanyak:
          </Text>
          <Text style={styles.boxJumlah}>20x (Rp. 356.000)</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Barang Tersedia</Text>
          <View
            style={{
              width: "84%",
              height: 3,
              backgroundColor: "white",
              borderRadius: 3,
            }}
          />
          <Icon
            type={Icons.Feather}
            name={"archive"}
            color={Color.black}
            style={styles.boxIcon}
          />
          <Text style={styles.boxText}>Sisa barang bulan ini:</Text>
          <Text style={styles.boxJumlah}>20 barang</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Barang</Text>
          <Text style={styles.boxTitle}>Hampir Habis</Text>
          <View
            style={{
              width: "71%",
              height: 3,
              backgroundColor: "white",
              borderRadius: 3,
            }}
          />
          <Icon
            type={Icons.Feather}
            name={"alert-circle"}
            color={Color.black}
            style={styles.boxIcon}
          />
          <Text style={styles.boxText}>Barang yang hampir habis sebanyak:</Text>
          <Text style={styles.boxJumlah}>20 barang</Text>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    padding: 7.5,
  },
  row: {
    flexDirection: "row",
  },
  box: {
    width: windowWidth - 33,
    height: windowWidth - 33,
    // alignItems: "center",
    justifyContent: "center",
    padding: 30,
    margin: 7.5,
    borderRadius: 16,
    backgroundColor: Color.primary,
  },
  boxTitle: {
    fontSize: 40,
    // fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    marginBottom: 40,
  },
  boxIcon: {
    fontSize: 100,
    margin: 30,
    color: "#fff",
  },
  boxText: {
    fontSize: 20,
    color: "#fff",
  },
  boxJumlah: {
    fontSize: 40,
    color: "#fff",
  },
});
