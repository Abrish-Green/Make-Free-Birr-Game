import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech'
import axios from 'axios'
const Currency = [
  {
    id:1,
    birrValue: 1,
    imageUrl: require('./assets/mo_anbessa_1_birr.jpg')
  },
  {
    id:2,
    birrValue: 1,
    imageUrl: require('./assets/new_1_birr.jpg')
  },
  {
    id:3,
    birrValue: 5,
    imageUrl: require('./assets/5_birr.jpg')
  },
  {
    id:4,
    birrValue: 10,
    imageUrl: require('./assets/old_birr_10.jpg')
  },
  {
    id:5,
    birrValue: 10,
    imageUrl: require('./assets/new_birr_10.jpg')
  },
  {
    id:6,
    birrValue: 50,
    imageUrl: require('./assets/old_new_50.jpg')
  },
  {
    id:7,
    birrValue: 50,
    imageUrl: require('./assets/new_birr_50.jpg')
  },
  {
    id:8,
    birrValue: 100,
    imageUrl: require('./assets/old_new_100.jpg')
  },
  {
    id:9,
    birrValue: 100,
    imageUrl: require('./assets/new_birr_100.jpg')
  },
  {
    id:10,
    birrValue: 200,
    imageUrl: require('./assets/new_birr_200.jpg')
  }
]
const styles = StyleSheet.create({
  appBar: {
    padding: 30,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1bc8e4'
  },
  appBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  container: {
    height: Dimensions.get('screen').height * .8,
  },
  coinBox: {
    display: 'flex',
    paddingLeft: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#35cabe',
    alignContent: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height * .3,
    width: Dimensions.get('screen').width *.96
  },
  image: {
    height: Dimensions.get('screen').height* .2,
    width: Dimensions.get('screen').width *.9
  },
  flipButton: {
    padding: 10,
    height: 10,
    width: 30,
  },
  freeMoney: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    width: Dimensions.get('screen').width,
  },
   button: {
    alignItems: "center",
    backgroundColor: "#ffba00",
    padding: 20,
    borderRadius: 5,
    marginLeft: Dimensions.get('screen').width * .25,
    width: Dimensions.get('screen').width *.5
  }
});


export const GenerateRandomMoney = (max=10) => {
  return Math.floor(Math.random() * max)+1
}

export const getImageURL = (id) => {
  let data = Currency.filter((item) => (item.id) === id)
  if (data.length) {
    return data[0].imageUrl
  }
  return "Not Found"
}
export const CalculateEarning = (id) => {
  let currency = Currency.filter((currencyItem)=> currencyItem.id === id)
  return Number(currency ? currency[0].birrValue : 0)
}
export default function App() {

  const [earned, setEarned] = React.useState(0)
  const [generatedNumber, setGeneratedNumber] = React.useState(1)
  const [trial, setTrial] = React.useState(0)
  
  const AnnounceBalance = (message) => {
    Speech.speak(message)
  } 

  React.useEffect(() => {
  
    console.log(CalculateEarning(generatedNumber))
    setEarned((prev) => Number(prev) + Number(CalculateEarning(generatedNumber)))
   }, [generatedNumber])
  const AppBar = () => {
  return (<>
   <StatusBar style="auto" />
    <View style={styles.appBar}>
        <Text style={styles.appBarText}>Free Money Game</Text>
    </View>
  </>)
}
const CoinBox = () => {
  let imageUrl = getImageURL(generatedNumber);
  return (<>
    <View style={styles.coinBox}>
      <Image style={styles.image} source={imageUrl} />
    </View>
  </>)
}
const FlipButton = () => {

  

    if (trial === 5) {
      AnnounceBalance(`You are a winner`)
    }
  return (
    <>
      {trial === 5 ? 
        null
      :
        <TouchableOpacity
        style={styles.button}
        onPress={() => { setGeneratedNumber(GenerateRandomMoney(10)); setTrial((prev) => prev + 1) }}
        disabled={trial === 5}
      >
        <Text>Make Money</Text>
      </TouchableOpacity>}
      
    </>
  )
}
const CoinContainer = () => {
  return (
  <>
    <View style={styles.container}>
        <CoinBox />
        <FlipButton />
        <FreeMoney />
    </View>
    
  </>)
}

const FreeMoney = () => {
  return (
    <>
      <View style={{ padding: 40, flexDirection: 'row' }}>
        <Text style={{ flex:4}}></Text>
        <Text style={{ flex: 10, justifyContent: 'center', fontWeight: 'bold', fontSize: 25 }}>
          {earned ? earned : '0'}
          <Text style={{marginLeft: 10, color: '#ffb600', fontSize: 30, fontWeight: 'bold'}}> Birr</Text>  </Text>
        

      </View>  
    </>
  )
}

  return (
    <>
    <AppBar />
    <CoinContainer />
    </>
  );
}


