import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Button} from 'react-native-paper';

const ImageForm = () => {
  const data = useRoute();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  //console.log(data.params.xt_image);

  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('user_image', {
        uri: data.params.xt_image,
        type: 'image/jpeg',
        name: 'user_image.jpg',
      });

      const response = await axios.post(
        'http://dev3.xicom.us/xttest/savedata.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Data submitted successfully:', response.data);
      if (response.data.status === 'success') {
        Alert.alert('Success', 'Data submitted successfully');
        navigation.navigate('Image');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again.');
    }
  };
  return (
    <ScrollView style={{marginHorizontal: 10, marginVertical: 10}}>
      <KeyboardAvoidingView>
        <View>
          <Image source={{uri: data.params.xt_image}} style={styles.image} />
        </View>
        <View style={styles.formContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text style={styles.title}>First Name: </Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text style={styles.title}>Last Name: </Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text style={styles.title}>Email: </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text style={styles.title}>Phone Number: </Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{width: '50%', alignSelf: 'flex-end'}}>
            Submit
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ImageForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    marginTop: 15,
  },
  input: {
    height: 40,
    width: '65%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    flex: 0.9,
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
