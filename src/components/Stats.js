import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

import colors from '../styles/Colors';

class Stats extends React.Component {
  handleCanvas = canvas => {
    var datas = [
      { all: 10, done: 6 },
      { all: 10, done: 3 },
      { all: 10, done: 9 },
      { all: 100, done: 95 },
      { all: 10, done: 6 },
      { all: 10, done: 6 },
      { all: 10, done: 6 }
    ];

    const ctx = canvas.getContext('2d');
    let cv = _cv.prototype;

    for (var i = 0; i < datas.length; i++)
      cv.drawStats(ctx, i * 25 + 10, 10, datas[i]);
  };

  render() {
    let d = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    let days = [];
    for (var i = 0; i < d.length; i++) {
      days.push(
        <Text style={styles.weekDay} key={i}>
          {d[i]}
        </Text>
      );
    }

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Last week statistic</Text>
        <View
          style={{
            width: 180,
            height: 140,
            flexDirection: 'column'
          }}
        >
          <Canvas ref={this.handleCanvas} style={{ height: 120 }} />
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>{days}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    color: colors.white + '33',
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  weekDay: {
    fontSize: 15,
    color: colors.white + '1A',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginRight: 14.4
  }
});

export default Stats;

class _cv {
  roundRect(ctx, x, y, width, height, radius, fill, stroke, color) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fillStyle = color;
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  drawStats(ctx, x, y, data) {
    var color = {
      default: '#c7dcff1a',
      done: colors.primaryColor
    };

    let all = data.all;
    let done = data.done;

    var opts = {
      x: x,
      y: y,
      w: 10,
      h: 100
    };
    var opts1 = {
      x: opts.x,
      y: opts.y + opts.h - (opts.h / all) * done,
      w: opts.w,
      h: (opts.h / all) * done
    };

    this.roundRect(
      ctx,
      opts.x,
      opts.y,
      opts.w,
      opts.h,
      5,
      true,
      false,
      color.default
    );
    this.roundRect(
      ctx,
      opts1.x,
      opts1.y,
      opts1.w,
      opts1.h,
      5,
      true,
      false,
      color.done
    );
  }
}
