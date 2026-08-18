type IconProps = {
  src: string;
  description: string;
  title?: string;
  size?: number;
};

export function Icon({ src, description, title, size = 50 }: IconProps) {
  return (
    <img
      src={src}
      alt={description}
      title={title}
      className="icon"
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
