import React from 'react';
import { Text, View } from "react-native";
import { User } from "firebase/auth";

type HomeProps = {
  user: User;
};

export default function Home({ user }: HomeProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome, {user.email}</Text>
      <Text> Tuko Home Screen</Text>
    </View>
  );
}
