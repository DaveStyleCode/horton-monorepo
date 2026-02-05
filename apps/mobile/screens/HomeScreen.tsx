import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

import { buildCommunityCards } from "../lib/community";
import type { PageBuilderData, State } from "../lib/pageBuilder";

type HomeScreenProps = {
  pageData: PageBuilderData | null;
  states: State[];
  isLoading: boolean;
  hasError: boolean;
  hasSanityConfig: boolean;
  onOpenWebsite: () => void;
  onExploreCommunities: () => void;
};

export function HomeScreen({
  pageData,
  states,
  isLoading,
  hasError,
  hasSanityConfig,
  onOpenWebsite,
  onExploreCommunities
}: HomeScreenProps) {
  const heroAnim = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const featuredAnim = useRef(new Animated.Value(0)).current;
  const stepsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(140, [
      Animated.timing(heroAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(searchAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(featuredAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(stepsAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }, [featuredAnim, heroAnim, searchAnim, statsAnim, stepsAnim]);

  const fadeUp = (value: Animated.Value): Animated.WithAnimatedObject<{ opacity: number; transform: { translateY: number }[] }> => ({
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0]
        })
      }
    ]
  });

  const heroBlock = pageData?.sections?.find((section) => section?._type === "heroBlock");
  const communityBlock = pageData?.sections?.find(
    (section) => section?._type === "communityCollectionBlock"
  );

  const heroHeadline =
    heroBlock?.headline ?? pageData?.title ?? "Find the neighborhood that fits how you live.";
  const heroSubhead =
    heroBlock?.subhead ??
    pageData?.summary ??
    "A mobile-first homepage that mirrors the website experience, built for quick discovery, confident decisions, and easy next steps.";

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-16 pt-16"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={fadeUp(heroAnim)} className="flex flex-col gap-6">
          <View className="flex-row items-center justify-between">
            <View
              className="rounded-full border px-3 py-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.2)"
              }}
            >
              <Text className="text-xs font-semibold uppercase tracking-widest text-white">
                D.R. Horton
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-3">
            <Text className="text-4xl font-semibold text-white">{heroHeadline}</Text>
            <Text className="text-base leading-6 text-slate-200">{heroSubhead}</Text>
          </View>

        </Animated.View>

        {states.length > 0 ? (
          <View
            className="mt-10 border-t pt-6"
            style={{ borderTopColor: "rgba(255,255,255,0.12)" }}
          >
            <Text className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">
              States
            </Text>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {states.map((state) => (
                <View
                  key={state._id}
                  className="rounded-full border px-3 py-1"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.18)"
                  }}
                >
                  <Text className="text-xs font-semibold text-slate-100">{state.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
