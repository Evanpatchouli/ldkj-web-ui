import { defineComponent, h } from "vue";

const versionLinks = [
  { text: "v0.20.0（2026-06-08）", link: "/devlog/v0.20.0" },
  { text: "v0.19.0（2026-06-08）", link: "/devlog/v0.19.0" },
  { text: "v0.18.0（2026-06-08）", link: "/devlog/v0.18.0" },
  { text: "v0.17.0（2026-06-05）", link: "/devlog/v0.17.0" },
  { text: "v0.16.2（2026-06-05）", link: "/devlog/v0.16.2" },
  { text: "v0.16.1（2026-06-02）", link: "/devlog/v0.16.1" },
  { text: "v0.16.0（2026-06-02）", link: "/devlog/v0.16.0" },
  { text: "v0.14.1（2026-05-16）", link: "/devlog/v0.14.1" },
  { text: "v0.14.0（2026-05-15）", link: "/devlog/v0.14.0" },
  { text: "v0.13.0（2026-05-09）", link: "/devlog/v0.13.0" },
  { text: "v0.12.0（2026-05-09）", link: "/devlog/v0.12.0" },
  { text: "v0.11.0（2026-05-08）", link: "/devlog/v0.11.0" },
  { text: "v0.10.0（2026-05-07）", link: "/devlog/v0.10.0" },
  { text: "v0.9.0（2026-05-07）", link: "/devlog/v0.9.0" },
  { text: "v0.8.0（2026-05-07）", link: "/devlog/v0.8.0" },
  { text: "v0.7.0（2026-04-29）", link: "/devlog/v0.7.0" },
  { text: "v0.6.0（2026-04-28）", link: "/devlog/v0.6.0" },
  { text: "v0.5.0（2026-04-28）", link: "/devlog/v0.5.0" },
  { text: "v0.4.0（2026-04-28）", link: "/devlog/v0.4.0" },
  { text: "v0.3.0（2026-04-25）", link: "/devlog/v0.3.0" },
  { text: "v0.2.2（2026-04-23）", link: "/devlog/v0.2.2" },
  { text: "v0.2.1（2026-04-23）", link: "/devlog/v0.2.1" },
  { text: "v0.2.0（2026-04-23）", link: "/devlog/v0.2.0" },
  { text: "v0.1.0（2026-04-22）", link: "/devlog/v0.1.0" },
];

export default defineComponent({
  name: "DevlogIndexList",
  setup() {
    const links = import.meta.env.PROD
      ? versionLinks
      : [
          { text: "Next（未发行）", link: "/devlog/next" },
          ...versionLinks,
        ];

    return () =>
      h(
        "ul",
        null,
        links.map((item) => h("li", { key: item.link }, [h("a", { href: item.link }, item.text)])),
      );
  },
});
