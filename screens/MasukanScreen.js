import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Colors from './../components/Colors';

const MasukanScreen = () => {
  const [form, setForm] = useState({
    nameItem: '',
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input Data</Text>
      <View style={styles.packName}>
        <Text style={styles.labelName}>Name:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Item"
        />
      </View>
      <View style={styles.packType}>
        <Text style={styles.labelName}>Type:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Type"
        />
      </View>
      <View style={styles.packType}>
        <Text style={styles.labelName}>Quantity:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Quantity"
        />
      </View>
      <View style={styles.packType}>
        <Text style={styles.labelName}>Price:</Text>
        <TextInput
          style={styles.inputName}
          value={form.nameItem}
          placeholder="Input Name Price"
        />
      </View>
      <TouchableOpacity style={styles.fixToText}>
        <Text
          style={styles.btnSave}
          // title="Save"
          // onPress={() => Alert.alert('Right button pressed')}
        >
          Save
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
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  packName: {
    marginTop: 30,
    marginBottom: 20,
  },
  packType: {
    marginTop: 10,
    marginBottom: 20,
  },
  labelName: {
    fontSize: 18,
    color: 'black',
  },
  inputName: {
    height: 40,
    width: 320,
    borderBottomWidth: 1,
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
});

export default MasukanScreen;
