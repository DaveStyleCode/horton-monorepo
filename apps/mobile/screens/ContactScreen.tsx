import { Pressable, ScrollView, Text, View } from "react-native";

type ContactScreenProps = {
  onOpenWebsite: () => void;
};

export function ContactScreen({ onOpenWebsite }: ContactScreenProps) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-6 pb-16 pt-16"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col gap-3">
        <Text className="text-3xl font-semibold text-white">Talk to the team</Text>
        <Text className="text-sm leading-6 text-slate-300">
          Share your goals and we’ll connect you with a sales specialist in your market.
        </Text>
      </View>

      <View className="mt-6 flex flex-col gap-4">
        {[
          {
            title: "Schedule a tour",
            body: "Pick a date and explore available homes in person or virtually."
          },
          {
            title: "Request pricing",
            body: "Get the latest incentives and floor plan pricing for your market."
          },
          {
            title: "Chat with sales",
            body: "Talk through timelines, financing, and quick move-in inventory."
          }
        ].map((item) => (
          <View key={item.title} className="rounded-3xl bg-white px-5 py-5">
            <Text className="text-base font-semibold text-slate-900">{item.title}</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-600">{item.body}</Text>
          </View>
        ))}
      </View>

      <View
        className="mt-8 rounded-3xl border px-5 py-5"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        <Text className="text-lg font-semibold text-white">Prefer self-serve?</Text>
        <Text className="mt-2 text-sm leading-6 text-slate-300">
          Jump into the full website experience to browse inventory and availability.
        </Text>
        <Pressable className="mt-4 rounded-full bg-white px-5 py-2.5" onPress={onOpenWebsite}>
          <Text className="text-sm font-semibold text-slate-900">Browse online</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
