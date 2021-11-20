import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {windowWidth, windowHeight} from './../components/Dimentions';

const KeluaranScreen = () => {
  const [text, setText] = useState('');

  const data = [
    {
      name: 'KFC',
      price: 100,
    },
    {
      name: 'Taco Bell',
      price: 100,
    },
    {
      name: "Andy Capp's fries",
      price: 100,
    },
    {
      name: "Andy Capp's fries",
      price: 100,
    },
    {
      name: 'Kinder',
      price: 100,
    },
    {
      name: 'Taco Bell',
      price: 100,
    },
    {
      name: "Wendy's",
      price: 100,
    },
    {
      name: 'Cheetos',
      price: 100,
    },
    {
      name: 'M&M Food Market',
      price: 100,
    },
    {
      name: 'Heinz',
      price: 100,
    },
    {
      name: 'Kits',
      price: 100,
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.packSearch}>
        <TextInput
          style={styles.inputName}
          value={text}
          placeholder="Input Search Name"
        />
      </View>
      <ScrollView style={styles.packCart}>
        {data.map((e, i) => (
          <View key={i} style={styles.card}>
            <Text>{e.name}</Text>
            <Text>{e.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  packSearch: {
    alignItems: 'center',
    marginTop: 30,
  },
  inputName: {
    height: 40,
    width: 320,
    borderBottomWidth: 1,
  },
  packCart: {
    // alignItems: 'center',
    marginTop: 30,
    // backgroundColor: 'white',
    width: windowWidth - 33,
    height: windowWidth - 33,
  },
  card: {
    width: windowWidth - 33,
    backgroundColor: 'white',
  },
});

export default KeluaranScreen;
