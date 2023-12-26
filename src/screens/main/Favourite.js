import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const Favourite = () => {
  return (
    <View style={styles.container}></View>
  )
}

export default Favourite

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})