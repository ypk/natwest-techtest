type IconProps = {
  src: string;
  description: string;
  size?: number;
};

export function Icon({ src, description, size = 50 }: IconProps) {
  return (
    <img
      src={src}
      alt={description}
      className="icon"
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
