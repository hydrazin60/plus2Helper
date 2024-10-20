import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styled } from "nativewind";
import { useRouter } from "expo-router";

const Container = styled(View);

export default function FirstPage() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <Container className="h-96 flex flex-col justify-between  bg-blue-500 rounded-b-3xl ">
        <View className="flex items-center mt-8 mb-6 h-[40%]">
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.WFxpkp9Mu5fC5jQI-mTukQHaG0?rs=1&pid=ImgDetMain",
            }}
            className=" h-24 w-24 rounded-full"
          />
          <View className="flex flex-col items-center">
            <Text className="text-white text-2xl font-semibold">+2Helper</Text>
            <Text className="text-gray-300 text-lg">
              we can provide any service
            </Text>
          </View>
        </View>
        <View
          className="flex flex-col justify-center items-center  gap-3  bg-blue-600 h-[50%] px-8  "
          style={{
            borderTopLeftRadius: "1000%",
            borderTopRightRadius: "1000%",
          }}
        >
          <View className="flex flex-row justify-between  ">
            <View className="flex flex-col gap-2">
              <Text>5000+ </Text>
              <Text>MCQ</Text>
            </View>
            <View className="flex flex-col gap-2">
              <Text> 2000+ </Text>
              <Text> short quest.</Text>
            </View>
            <View className="flex flex-col gap-2">
              <Text>800+</Text>
              <Text>long quest.</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              className="bg-white p-3 rounded-full"
              onPress={() => router.push("/Login")}
            >
              <Text> Start to learning </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-lg mt-4">Welcome to First Page</Text>
      </View>
    </SafeAreaView>
  );
}
