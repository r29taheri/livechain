import { memo, useState } from 'react';

import { isEmpty } from 'lodash';
import ReactPlayer from 'react-player';

interface Props {
  src: string;
}

export const VideoPreview = memo(({ src }: Props) => {
  const [playing, setPlaying] = useState(false);

  const handleClickOnVideo = (event: any) => {
    event.stopPropagation();
    setPlaying((prevState) => !prevState);
  };

  if (isEmpty(src)) return null;

  return (
    <div onMouseEnter={handleClickOnVideo} onMouseLeave={handleClickOnVideo}>
      <div>
        <ReactPlayer
          muted
          url={src}
          width="100%"
          height="100%"
          playing={playing}
        />
      </div>
    </div>
  );
});

VideoPreview.displayName = 'VideoPreview';
