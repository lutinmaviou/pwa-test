import { Box, Button, Stack, Text } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { getHeightPercent, secToFullTime } from '@utils';
import { useEffect, useState } from 'react';

import useCounter from '@hooks/useCounter';

// const DEFAULT_TIME = 2 * 60 * 60; // 2hr:00min:00s
const DEFAULT_TIME = 10; // 2hr:00min:00s

const CountDown = () => {
  const [bottom, setBottom] = useState<number>(DEFAULT_TIME);

  const {
    stopCounter,
    setSeconds,
    started,
    startCounter,
    seconds,
    setTime,
    repeat,
    handleReapeat,
  } = useCounter(DEFAULT_TIME);

  const handleTime = (val: Date) => {
    const h = val.getHours() * 60 * 60;
    const min = val.getMinutes() * 60;
    const sec = val.getSeconds();

    setTime(h + min + sec);
    setSeconds(h + min + sec);
  };

  useEffect(() => {
    const h = getHeightPercent(seconds, DEFAULT_TIME);
    setBottom(h);
  }, [seconds]);

  return (
    <Stack
      spacing="md"
      style={{
        flexGrow: 1,
      }}
    >
      <Stack
        style={{
          width: 'min(100vw, 20em)',
          flexGrow: 1,
          overflow: 'hidden',
          background: 'white',
          borderRadius: 'md',
          position: 'relative',
          border: '1px solid #fff',
        }}
        sx={({ radius }) => ({
          borderRadius: radius.sm,
        })}
        align="center"
        justify="center"
      >
        <Box
          style={{
            width: '100%',
            position: 'absolute',
            background:
              ' #9eabe4 linear-gradient(315deg, #9eabe4 0%, #77eed8 74%)',
            top: 0,
            bottom: `${bottom}%`,
            transition: 'all 1000ms ease',
          }}
        />
        <Text
          style={{ fontSize: '3rem', position: 'relative', zIndex: 1 }}
          weight={700}
          color={bottom >= 50 ? '#63a4ff' : '#fff'}
        >
          {secToFullTime(seconds)}
        </Text>
      </Stack>
      <Stack
        style={{
          flexDirection: 'row',
        }}
      >
        <TimeInput
          withSeconds
          onChange={handleTime}
          disabled={started}
          size="md"
        />
        <Button
          style={{ flexGrow: 1 }}
          color={repeat ? 'green' : 'gray'}
          size="md"
          disabled={started}
          onClick={handleReapeat}
        >
          Repeat
        </Button>
      </Stack>
      <Stack
        style={{
          flexDirection: 'row',
        }}
      >
        <Button
          style={{ width: '100%' }}
          size="md"
          onClick={startCounter}
          disabled={started}
        >
          Start
        </Button>
        <Button
          style={{ width: '60%' }}
          color="red"
          size="md"
          disabled={!started}
          onClick={stopCounter}
        >
          Stop
        </Button>
      </Stack>
    </Stack>
  );
};

export default CountDown;
