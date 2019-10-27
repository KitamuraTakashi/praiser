import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import reactImage from '../../../../assets/reactIcon.jpg'
import Button from '../../Button'
import React from 'react'

const { width } = Dimensions.get('window')
const padding = 20
const edgeNumber = 2
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding,
  },
  text: {
    fontSize: 28,
    fontWeight: '800',
    color: '#555',
    lineHeight: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width - padding * edgeNumber,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
  },
  image: {
    width: width - padding * edgeNumber,
    resizeMode: 'contain',
    flex: 1,
  },
  imageContainer: {
    flex: 2,
  },
  contentContainer: {
    flex: 3,
    paddingTop: 30,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

function RenderItem({ onPress, item }: { item: { text: string }, onPress: () => void }) {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <View style={styles.imageContainer}>
          <Image source={reactImage} resizeMode="contain" style={styles.image}/>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          <Button
            onPress={onPress}
            label="次へ"
          />
        </View>
      </View>
    </View>
  );
}

export default RenderItem