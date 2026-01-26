import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FormProvider } from "@/contexts/FormProvider";
import { queryClient } from "@/contexts/queryClient";
export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="patient-details"
              options={{ title: "Patient Details", headerShown: true }}
            />
            <Stack.Screen
              name="picu-observations"
              options={{ title: "PICU Observations", headerShown: true }}
            />
            <Stack.Screen
              name="daily-interventions"
              options={{ title: "Daily Interventions", headerShown: true }}
            />
            <Stack.Screen
              name="investigations"
              options={{ title: "Investigations", headerShown: true }}
            />
            <Stack.Screen
              name="medications-discharge"
              options={{ title: "Medications & Discharge", headerShown: true }}
            />
          </Stack>
        </GestureHandlerRootView>
      </FormProvider>
    </QueryClientProvider>
  );
}
