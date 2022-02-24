import * as React from 'react';
import Box from '@mui/material/Box';
import QRCode from 'react-qr-code';
import {useEffect, useRef} from "react";

const colors = ["#800080", "#008000", "#808000", "#FFFF00", "#00FFFF"];

const ballSize = 200;

const isBoundary = (idx, dir, boundary) => {
    return dir === 1 && idx + ballSize >= boundary || dir === -1 && idx <= 0;
}

const boxStyle = {
    bgcolor: 'black',
    height: '100vh',
    '& > div': {
        position: 'absolute'
    }
};

const containerStyle = (x, y) =>  {
   return {
       top: y,
       left: x
   }
}

export default function Index() {
  const container = useRef();

  const [ball, setBall] = React.useState({
      x: 0,
      y: 0,
      xDir: 1,
      yDir: 1,
  });

  const [colorIdx, setColorIdx] = React.useState(0);

  const { x, y, xDir, yDir } = ball;

  const randColorIdx = () => {
      return Math.floor(Math.random() * colors.length);
  }

  useEffect(() => {
      if (!container.current)
          return;

      window.requestAnimationFrame(() => {
          const width = container.current.offsetWidth;
          const height = container.current.offsetHeight;

          if (isBoundary(x, xDir, width)) {
              setBall((currVal) => ({
                  ...currVal,
                  xDir: xDir * -1
              }))
              setColorIdx(randColorIdx());
          } else if (isBoundary(y, yDir, height)) {
              setBall((currVal) => ({
                  ...currVal,
                  yDir: yDir * -1
              }))
              setColorIdx(randColorIdx());
          } else {
              setBall((currVal) => ({
                  ...currVal,
                  x: x + xDir,
                  y: y + yDir
              }))
          }
      });

  }, [colorIdx, x, y, xDir, yDir]);
  return (
      <Box sx={boxStyle} ref={container}>
          <Box style={containerStyle(x,y)}>
              <QRCode
                  value="https://computersandtacos.com"
                  size={ballSize}
                  bgColor={colors[colorIdx]}
              />
          </Box>
      </Box>
  );
}