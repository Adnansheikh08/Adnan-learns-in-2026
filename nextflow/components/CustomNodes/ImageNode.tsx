type ImageData = {
  src?: string;
  label?: string;
};

type ImageNodeProps = {
  data: ImageData;
};

export default function ImageNode({ data }: ImageNodeProps) {
  return (
    // This image is rendered inside a node preview where Next.js Image optimizations are not required.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={data.src || "https://via.placeholder.com/150"}
      alt={data.label || "Node image"}
      className="rounded"
    />
  );
}