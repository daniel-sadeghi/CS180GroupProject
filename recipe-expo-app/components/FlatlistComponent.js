import React, {  useState } from 'react'
import { StyleSheet,Text, View, Alert, Button, Image, FlatList, TouchableOpacity, } from 'react-native'


const CartItemComponent = ({ imageSource, bannerText, ingredientsText }) => {
  
  const data = [
    { id: 1, image: 'https://bootdey.com/img/Content/avatar/avatar1.png', quant:1, },
  ]
  
  const [users, setUsers] = useState(data)

  showFavoritedAlert = () => Alert.alert('Saved!', 'Item Added to Favorites' )
  const showRemoveAlert = () => Alert.alert('Remove?', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel',},
      {text: 'OK'},
    ]);


        return (
          <View style={styles.box}>
            <Image style={styles.image} source={imageSource} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>{bannerText}</Text>
              <Text style={styles.description}>{ingredientsText}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.view]}
                  onPress={showFavoritedAlert}>
                  <Image
                    style={styles.icon}
                    source={{ uri: 'https://img.icons8.com/color/70/000000/filled-like.png' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonQuantityMinus, styles.profile]}
                  //onPress={showRemoveAlert}
                  >
                  <Text
                    style={[styles.signs]}>
                        -
                  </Text> 
                </TouchableOpacity>

                <View style={[styles.quantityView, styles.view]}>
                    <Text>1</Text>
                </View>

                <TouchableOpacity
                  style={[styles.buttonQuantityPlus, styles.profile]}
                  //onPress={showRemoveAlert}
                  >
                  <Text
                    style={[styles.signs]}>
                        +
                  </Text> 
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button2, styles.message]}
                  onPress={showRemoveAlert}>
                  <Image
                    style={styles.icon2}
                    source={{ uri: 'https://static.wikia.nocookie.net/baldi-fanon/images/7/7a/B889B0A9-4717-4D37-9ADD-AB7B5E11FAEF.png/revision/latest?cb=20190226222946' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
  },
  box: {
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    color: '#151515',
  },
  signs:{
    fontSize: 21,
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 50,
  },
  quantityView: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    marginTop: 50,
  },
  buttonQuantityPlus: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 35,
    marginRight: 5,
    marginTop: 50,
  },
  buttonQuantityMinus: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 35,
    marginRight: 0,
    marginTop: 50,
  },
  quantity: {

    marginTop: 50,
  },
  button2: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 42,
    marginRight: 5,
    marginTop: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon2: {
    width: 25,
    height: 25,
  },
  view: {
    backgroundColor: '#eee',
  },
  profile: {
    backgroundColor: '#9e9e9e',
  },
  message: {
    backgroundColor: '#ffa3b0',
  },
})

export default CartItemComponent