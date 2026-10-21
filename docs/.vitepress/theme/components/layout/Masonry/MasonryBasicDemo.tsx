import { Masonry } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const photos = [
  { id: "coast", width: 4, height: 3, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=720&q=80", alt: "海岸与浅蓝色海水" },
  { id: "forest", width: 3, height: 4, src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=540&q=80", alt: "雾气中的森林" },
  { id: "desert", width: 4, height: 5, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=576&q=80", alt: "暖色荒野景观" },
  { id: "mountain", width: 16, height: 10, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=768&q=80", alt: "覆雪山脉" },
  { id: "lake", width: 3, height: 2, src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=720&q=80", alt: "日出时的湖面" },
  { id: "architecture", width: 3, height: 4, src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=540&q=80", alt: "现代建筑立面" },
  { id: "road", width: 4, height: 3, src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=720&q=80", alt: "山谷中的道路" },
  { id: "city", width: 4, height: 5, src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=576&q=80", alt: "城市天际线" },
];

const Example = () => (
  <Masonry frameWidth={170} gap={12} data-masonry-demo="basic">
    {photos.map((photo) => (
      <Masonry.Item
        key={photo.id}
        width={photo.width}
        height={photo.height}
        className="overflow-hidden rounded-xl bg-slate-100"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </Masonry.Item>
    ))}
  </Masonry>
);

const code = `import { Masonry } from "@ldkj/web-ui";

const photos = [
  { id: "coast", width: 4, height: 3, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=720&q=80", alt: "海岸与浅蓝色海水" },
  { id: "forest", width: 3, height: 4, src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=540&q=80", alt: "雾气中的森林" },
  { id: "desert", width: 4, height: 5, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=576&q=80", alt: "暖色荒野景观" },
  { id: "mountain", width: 16, height: 10, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=768&q=80", alt: "覆雪山脉" },
  { id: "lake", width: 3, height: 2, src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=720&q=80", alt: "日出时的湖面" },
  { id: "architecture", width: 3, height: 4, src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=540&q=80", alt: "现代建筑立面" },
  { id: "road", width: 4, height: 3, src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=720&q=80", alt: "山谷中的道路" },
  { id: "city", width: 4, height: 5, src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=576&q=80", alt: "城市天际线" },
];

const Example = () => (
  <Masonry frameWidth={170} gap={12} data-masonry-demo="basic">
    {photos.map((photo) => (
      <Masonry.Item
        key={photo.id}
        width={photo.width}
        height={photo.height}
        className="overflow-hidden rounded-xl bg-slate-100"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </Masonry.Item>
    ))}
  </Masonry>
);`;

export default function MasonryBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
