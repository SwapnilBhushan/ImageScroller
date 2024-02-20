import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

function ImageScreen() {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', offset.toString());
      formData.append('type', 'popular');

      const response = await axios.post(
        'http://dev3.xicom.us/xttest/getdata.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setImages(response.data.images);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadImage = () => {
    setOffset(prev => prev + 1);
    fetchData();
  };
  // console.log(offset.toString());

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.contentContainer}
        data={images}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Pressable
            style={{marginVertical: 10, marginHorizontal: 5}}
            key={index}
            onPress={() => {
              navigation.navigate('ImageForm', item);
            }}>
            <Image source={{uri: item.xt_image}} style={styles.image} />
          </Pressable>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Button mode="contained" onPress={loadImage}>
              Click Here To Load More
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
  },
  footer: {
    height: 50,
    marginTop: 10,
  },
});

export default ImageScreen;
