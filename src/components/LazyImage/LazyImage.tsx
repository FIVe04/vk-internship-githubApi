import React from 'react';
import LazyLoad from 'react-lazyload';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder: string;
  width: number;
  height: number; 
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  width,
  height,
}) => {
  return (
    <LazyLoad
      height={height}
      offset={width}
      once
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ borderRadius: "50%", marginRight: 10 }}
      />
    </LazyLoad>
  );
};

export default LazyImage;
