import PluginLineClamp from 'windicss/plugin/line-clamp';

const range = (size, startAt = 1) => {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
};

export default {
  // attributify: {
  //   prefix: 'w:',
  // },
  plugins: [PluginLineClamp],
  safelist: [
    range(101, 0).map((i) => {
      const sReturn = `w-[${i}%]`;
      // console.log('sReturn :', sReturn);
      return sReturn;
    }),
  ],
  shortcuts: {},
  theme: {
    extend: {
      fontSize: {
        '08rem': ['0.8rem', '1.1rem'],
        '09rem': ['0.9rem', '1.2rem'],
      },
      colors: {
        // Configure your color palette here
        primary: '#1e71c9',
        'primary-select': '#2990ff',
        'primary-hover': '#3f8de0',
        'secondary-select': '#F64A4A',
        'secondary-hover': '#FF5757',
        'grad-default-white-from': '#FBFBFB',
        'grad-default-white-to': '#F4F7FC',
      },
      keyframes: {
        scaleltor: {
          '0%': {
            'transform-origin': '0% 50%',
            transform: 'scaleX(0)',
          },
          '100%': {
            'transform-origin': '0% 50%',
            transform: 'scaleX(1)',
          },
        },
      },
      animation: {
        'scale-l-to-r': 'scaleltor 1s ease-in-out',
      },
    },
  },
};
