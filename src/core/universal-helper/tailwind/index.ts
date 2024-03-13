declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export const FixbugVHScreenInMobile = () => {
  updateVHScreen();
  window.addEventListener('resize', updateVHScreen);
  window.addEventListener('orientationchange', updateVHScreen);
};

const updateVHScreen = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const IsPWA = () => {
  window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone || // support ios
    false;
};
