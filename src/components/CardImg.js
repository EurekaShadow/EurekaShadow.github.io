// src/components/CardImg.js
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Lazyimg from 'react-lazyimg-component';

export default function CardImg({ src, alt, isCenter = false }) {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <PhotoProvider maskOpacity={0.6} speed={() => 500}>
        <PhotoView src={src} alt={alt}>
          {isCenter ? (
            <center>
              <Lazyimg
                src={src}
                alt={alt}
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  cursor: 'zoom-in',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                }}
              />
            </center>
          ) : (
            <Lazyimg
              src={src}
              alt={alt}
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                cursor: 'zoom-in',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 0 15px rgba(0,0,0,0.1)',
              }}
            />
          )}
        </PhotoView>
      </PhotoProvider>
    </div>
  );
}