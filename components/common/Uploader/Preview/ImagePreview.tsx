import { memo } from 'react';
import Image from 'next/image';
import { isEmpty } from 'lodash';

interface Props {
  src: string;
}

export const ImagePreview = memo(({ src }: Props) =>
  isEmpty(src) ? null : (
    <div>
      <Image
        src={src}
        width="100%"
        height="100%"
        alt="Preview"
        objectFit="cover"
        layout="responsive"
      />
    </div>
  )
);

ImagePreview.displayName = 'ImagePreview';
