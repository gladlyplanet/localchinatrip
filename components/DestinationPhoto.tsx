type DestinationPhotoProps = {
  caption: string;
  fallbackImage: string;
};

export function DestinationPhoto({ caption, fallbackImage }: DestinationPhotoProps) {
  return <img src={fallbackImage} alt={caption} className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />;
}
