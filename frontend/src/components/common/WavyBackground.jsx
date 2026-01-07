export const WavyBackground = () => (
  <div className="aboslute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <svg
      className="absolute bottom-0 left-0 w-full h-auto"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      style={{ transform: 'translateY(50%)' }}
    >
      <path
        fill="#dbeafe"
        fillOpacity="0.4"
        d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
    <svg
      className="absolute top-0 left-0 w-full h-auto"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      style={{ transform: 'translateY(-50%)' }}
    >
      <path
        fill="#e0e7ff"
        fillOpacity="0.3"
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
    <svg
      className="absolute top-1/3 left-0 w-full h-auto opacity-20"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#3b82f6"
        fillOpacity="0.2"
        d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
);