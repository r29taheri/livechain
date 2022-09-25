import { ImagePreview } from './ImagePreview';
import { VideoPreview } from './VideoPreview';

interface Props {
  url: string;
  type: string;
}

export const PreviewFile = ({ url, type }: Props) => {
  switch (type) {
    case 'image':
      return <ImagePreview src={url} />;
    case 'video':
      return <VideoPreview src={url} />;

    default:
      return <div />;
  }
};
