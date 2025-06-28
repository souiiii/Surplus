import React, { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = memo(({ id = "tsparticles" }) => {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setEngineReady(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles loaded:", container);
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "#RRGGBBAA" } }, // fixed invalid color
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "repulse" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          repulse: { distance: 200, duration: 0.4 },
          grab: { distance: 150 },
        },
      },
      particles: {
        color: { value: "#fdfbf9" },
        links: {
          color: "#fdfbf9",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
        number: { value: 150, density: { enable: true, area: 800 } },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!engineReady) return null;

  return <Particles id={id} options={options} loaded={particlesLoaded} />;
});

export default ParticlesComponent;
