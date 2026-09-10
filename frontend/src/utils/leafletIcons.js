import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Vite asset bundling for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Modern SVG Icons for UdyamSaathi Map
export const createPinIcon = (type = 'shop', isSelected = false) => {
  let bg = '#ef4444'; // Red for competitor shops
  let border = '#991b1b';
  let emoji = '🏪';
  let label = 'Shop';

  if (type === 'gap') {
    bg = '#16a34a'; // Emerald green for opportunities
    border = '#14532d';
    emoji = '✨';
    label = 'Gap';
  } else if (type === 'center') {
    bg = '#2563eb'; // Royal blue for village center
    border = '#1e3a8a';
    emoji = '📍';
    label = 'Village';
  } else if (type === 'user') {
    bg = '#0284c7'; // Cyan/Sky blue for live user GPS
    border = '#0369a1';
    emoji = '🎯';
    label = 'You';
  }

  const scale = isSelected ? 'scale(1.2)' : 'scale(1)';
  const pulse = type === 'gap' ? 'animation: gapPulse 2s infinite;' : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        background: ${bg};
        border: 2.5px solid #ffffff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg) ${scale};
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: transform 0.2s ease;
        ${pulse}
      ">
        <span style="
          transform: rotate(45deg);
          font-size: 15px;
          line-height: 1;
        ">${emoji}</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
};
