import "./global.css";

import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { AppState, Linking, Pressable, Text, View } from "react-native";

import { PAGE_QUERY, STATES_QUERY, type PageBuilderData, type State } from "./lib/pageBuilder";
import { CommunitiesScreen } from "./screens/CommunitiesScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { hasSanityConfig, sanityClient } from "./sanity";

const WEBSITE_URL = process.env.EXPO_PUBLIC_WEBSITE_URL ?? "https://www.drhorton.com";

type ScreenKey = "home" | "communities" | "contact";

const screenTabs: { key: ScreenKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "communities", label: "Communities" },
  { key: "contact", label: "Contact" }
];

export default function App() {
  const [pageData, setPageData] = useState<PageBuilderData | null>(null);
  const [states, setStates] = useState<State[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("home");

  const fetchData = useCallback(async (showLoading = false) => {
    if (!sanityClient) return;

    if (showLoading) {
      setIsLoading(true);
      setHasError(false);
    }

    try {
      const [pageResult, statesResult] = await Promise.allSettled([
        sanityClient.fetch<PageBuilderData | null>(PAGE_QUERY, { slug: "home" }),
        sanityClient.fetch<State[]>(STATES_QUERY)
      ]);

      if (pageResult.status === "fulfilled") {
        setPageData(pageResult.value ?? null);
      } else if (showLoading) {
        setHasError(true);
        setPageData(null);
      }

      if (statesResult.status === "fulfilled" && Array.isArray(statesResult.value)) {
        setStates(statesResult.value);
      } else if (showLoading) {
        setStates([]);
      }
    } catch {
      if (showLoading) {
        setHasError(true);
        setPageData(null);
        setStates([]);
      }
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => fetchData(false), 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Refetch when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        fetchData(false);
      }
    });
    return () => subscription.remove();
  }, [fetchData]);

  const handleOpenWebsite = async () => {
    try {
      const canOpen = await Linking.canOpenURL(WEBSITE_URL);
      if (canOpen) {
        await Linking.openURL(WEBSITE_URL);
      }
    } catch {
      // no-op for now
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "communities":
        return <CommunitiesScreen pageData={pageData} onOpenWebsite={handleOpenWebsite} />;
      case "contact":
        return <ContactScreen onOpenWebsite={handleOpenWebsite} />;
      case "home":
      default:
        return (
          <HomeScreen
            pageData={pageData}
            states={states}
            isLoading={isLoading}
            hasError={hasError}
            hasSanityConfig={hasSanityConfig}
            onOpenWebsite={handleOpenWebsite}
            onExploreCommunities={() => setActiveScreen("communities")}
          />
        );
    }
  };

  return (
    <View className="flex-1 bg-slate-950">
      <View className="flex-1">{renderScreen()}</View>
      <View
        className="flex-row items-center justify-between px-6 pb-8 pt-3"
        style={{ borderTopColor: "rgba(255,255,255,0.08)", borderTopWidth: 1 }}
      >
        {screenTabs.map((tab) => {
          const isActive = tab.key === activeScreen;
          return (
            <Pressable
              key={tab.key}
              className="flex-1 items-center"
              onPress={() => setActiveScreen(tab.key)}
            >
              <View
                className="rounded-full px-3 py-2"
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.08)"
                }}
              >
                <Text
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: isActive ? "#0f172a" : "#e2e8f0" }}
                >
                  {tab.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <StatusBar style="light" />
    </View>
  );
}
