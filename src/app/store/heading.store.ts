import { defineStore } from "pinia";
import { ref } from "vue";
export const useHeadingStore = defineStore("heading", () => {
  const title = ref<string>("");
  const subtitle = ref<string>("");
  const setTitle = (value: string) => {
    title.value = value;
  };
  const setSubtitle = (value: string) => {
    subtitle.value = value;
  };

  const setHeading = (title: string, subtitle: string) => {
    setTitle(title);
    setSubtitle(subtitle);
  };

  return {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    setHeading,
  };
});
