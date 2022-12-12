import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import clouds from "../../assets/clouds.jpg";
import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";
import five from "../../assets/5.jpg";
import six from "../../assets/6.jpg";
import seven from "../../assets/7.jpg";
import axios from "axios";

const images = [one, two, three, four, five, six, seven];
const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [randomImage, setRandomImage] = useState(images[0]);

  const getWeather = async () => {
    if (!city.trim()) return;

    try {
      const res =
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &units=metric&appid=b0df1dfec8a19e0756fc6eb3b61edcb2`);
      setWeather(res.data);
      const n = Math.floor(Math.random() * images.length);
      setRandomImage(images[n]);
    } catch (error) {
      alert("You have entered  a wrong city name!");
    }
  };

  return (
    <ImageBackground source={randomImage} style={styles.image}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.TextInputContainer}>
          <TextInput
            style={styles.TextInput}
            value={city}
            placeholder="Write the city name..."
            onChangeText={(text) => setCity(text)}
          ></TextInput>
          <AntDesign
            onPress={getWeather}
            name="checkcircleo"
            size={24}
            color="black"
          />
        </View>

        {Object.keys(weather).length > 0 ? (
          <>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>
                {weather?.name}, {weather?.sys?.country}
              </Text>
            </View>

            <View style={styles.weatherContainer}>
              <Text style={styles.temp}>
                {Math.round(weather.main.temp)} °C
              </Text>
              <Text style={styles.weather}>{weather.weather[0].main}</Text>
            </View>
          </>
        ) : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  TextInputContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "70%",
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  TextInput: {
    height: 40,
    fontWeight: "600",
    paddingHorizontal: 10,
    fontSize: 18,
    color: "black",
    backgroundColor: "transparent",
  },
  locationContainer: {
    marginVertical: 15,
  },
  location: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  weatherContainer: {
    alignItems: "center",
  },
  temp: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 100,
    fontWeight: "800",
    backgroundColor: "rgba(255, 255, 255,0.2)",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 10,
  },
  weather: {
    color: "#FFF",
    fontSize: 48,
    fontWeight: "700",
    shadowColor: "#000000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.7,
  },
});
