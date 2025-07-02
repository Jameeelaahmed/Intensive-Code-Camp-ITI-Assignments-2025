import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
  require('./assets/img.jpg'),
  require('./assets/img1 (2).jpg'),
  require('./assets/img3 (2).jpg'),
  require('./assets/img.jpg'),
  require('./assets/img1 (2).jpg'),
  require('./assets/img3 (2).jpg'),
];

const THUMB_SIZE = 70;

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null);

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setSelectedIndex(index);
  };

  const onThumbnailPress = (idx) => {
    setSelectedIndex(idx);
    scrollRef.current?.scrollTo({ x: idx * width, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={{ flexGrow: 0 }}
      >
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={img}
            style={styles.mainImage}
          />
        ))}
      </ScrollView>
      <View style={styles.thumbnailContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
        >
          {images.map((img, idx) => (
            <TouchableOpacity key={idx} onPress={() => onThumbnailPress(idx)}>
              <Image
                source={img}
                style={[
                  styles.thumbnail,
                  selectedIndex === idx && styles.selectedThumbnail,
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 20,
    width: width,
    alignItems: 'center',
  },
  thumbnail: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedThumbnail: {
    borderColor: 'red',
  },
});

export default App;
