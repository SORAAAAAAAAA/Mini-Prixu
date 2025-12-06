import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image,
  useWindowDimensions, 
  ImageSourcePropType,
  ViewToken,
  ListRenderItem
} from 'react-native';
import { useRouter } from 'expo-router';
import slides from '../data/carouselData';
import Button from '../components/ui/button';

// 1. Define the Interface for your Slide Data
interface SlideItem {
  id: string;
  description: string;
  image?: ImageSourcePropType; // Optional if you don't have images yet
}


export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Type the FlatList Ref (Optional, but good practice if you need to control scroll programmatically)
  const slidesRef = useRef<FlatList<SlideItem>>(null);

  // 4. Type the 'viewableItemsChanged' callback
  // This is the tricky part in TS. It needs specific types for the viewable items.
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // 5. Configuration ref (No special types needed usually, but good to keep const)
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // 6. Strongly typed RenderItem component
  const renderItem: ListRenderItem<SlideItem> = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageContainer}>
         <Image source={item.image} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
      <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={styles.title}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
    
      {/* Paginator Dots */}
      <View style={styles.paginator}>
        {slides.map((_, index) => {
          return (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                { width: index === currentIndex ? 20 : 10, opacity: index === currentIndex ? 1 : 0.3 }
              ]}
            />
          );
        })}
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <Button title='Get Started' onPress={() => router.replace('/signin')}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    overflow: 'hidden',
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#007AFF',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  paginator: {
    flexDirection: 'row',
    height: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginBottom: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#493d8a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});