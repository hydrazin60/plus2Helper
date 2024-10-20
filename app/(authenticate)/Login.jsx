import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { styled } from "nativewind";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const Container = styled(View);
const StyledText = styled(Text);

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <View className="flex-row  justify-between   py-10 px-5">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Need some help?
          </StyledText>
        </TouchableOpacity>
      </View>

      <ScrollView className="h-[95%] flex-1 bg-black rounded-t-3xl p-5">
        <KeyboardAvoidingView>
          <View className="flex flex-col justify-between items-center">
            <View>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.WFxpkp9Mu5fC5jQI-mTukQHaG0?rs=1&pid=ImgDetMain",
                }}
                className=" h-24 w-24 rounded-full"
              />
            </View>
            <View className="flex flex-col gap-1 items-center">
              <StyledText className="text-white text-xl font-bold">
                +2Helper
              </StyledText>
            </View>
          </View>
          <View>
            <TextInput
              className="h-12 bg-gray-700 rounded-3xl p-3 mt-10"
              placeholder="Enter your email"
              placeholderTextColor={"gray"}
              style={{ flex: 1, paddingHorizontal: 10 }}
            />
            <TextInput
              className="h-12 bg-gray-700 rounded-3xl p-3 mt-10"
              placeholder="Enter your password"
              placeholderTextColor={"gray"}
              style={{ flex: 1, paddingHorizontal: 10 }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
