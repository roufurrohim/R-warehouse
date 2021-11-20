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
          <Text style={styles.boxTitle}>BARANG MASUK</Text>
          <Icon type={Icon.Feather} name="log-in" color={Color.black} />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>BARANG KELUAR</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>BARANG TERSEDIA</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>BARANG HAMPIR HABIS</Text>
        </View>
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
    padding: 20,
    margin: 7.5,
    borderRadius: 16,
    backgroundColor: "rgba(96, 144, 191, 0.5)",
  },
  boxTitle: {
    fontSize: 50,
    // fontWeight: "bold",
    color: "#000",
  },
  scrollView: {
    marginBottom: 40,
  },
});
