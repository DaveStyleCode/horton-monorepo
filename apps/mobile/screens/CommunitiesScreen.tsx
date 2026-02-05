import { Pressable, ScrollView, Text, View } from "react-native";

import { buildCommunityCards } from "../lib/community";
import type { PageBuilderData } from "../lib/pageBuilder";

type CommunitiesScreenProps = {
  pageData: PageBuilderData | null;
  onOpenWebsite: () => void;
};

export function CommunitiesScreen({ pageData, onOpenWebsite }: CommunitiesScreenProps) {
  const communityBlock = pageData?.sections?.find(
    (section) => section?._type === "communityCollectionBlock"
  );

  const headline = communityBlock?.headline ?? "Communities";
  const subhead =
    communityBlock?.subhead ??
    "Compare neighborhoods, pricing, and quick move-in availability at a glance.";

  const communityCards = buildCommunityCards(communityBlock?.communities);

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-6 pb-16 pt-16"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col gap-3">
        <Text className="text-3xl font-semibold text-white">{headline}</Text>
        <Text className="text-sm leading-6 text-slate-300">{subhead}</Text>
        <View className="mt-4 flex-row flex-wrap gap-2">
          {["Move-in ready", "3+ beds", "Under $400k", "New builds"].map((chip) => (
            <View
              key={chip}
              className="rounded-full border px-3 py-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.18)"
              }}
            >
              <Text className="text-xs font-semibold text-white">{chip}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-6 flex flex-col gap-4">
        {communityCards.map((community) => (
          <View key={community.name} className="overflow-hidden rounded-3xl bg-white">
            <View className="h-36 bg-slate-200" />
            <View className="flex flex-col gap-2 px-5 py-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-lg font-semibold text-slate-900">{community.name}</Text>
                  <Text className="mt-1 text-sm text-slate-500">{community.location}</Text>
                </View>
                {community.status ? (
                  <View className="rounded-full bg-slate-100 px-3 py-1">
                    <Text className="text-[11px] font-semibold uppercase tracking-widest text-slate-600">
                      {community.status}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-slate-900">{community.price}</Text>
                <Text className="text-xs text-slate-500">
                  {community.beds} · {community.baths}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View
        className="mt-8 rounded-3xl border px-5 py-5"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        <Text className="text-lg font-semibold text-white">Looking for more details?</Text>
        <Text className="mt-2 text-sm leading-6 text-slate-300">
          Explore full pricing, floor plans, and incentives on the website experience.
        </Text>
        <Pressable className="mt-4 rounded-full bg-white px-5 py-2.5" onPress={onOpenWebsite}>
          <Text className="text-sm font-semibold text-slate-900">Open full listings</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
