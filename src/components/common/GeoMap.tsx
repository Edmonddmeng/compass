import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

interface MapDataPoint {
  name: string;
  state: string;
  value: number;
  color?: string;
}

interface GeoMapProps {
  data: MapDataPoint[];
  height?: number;
}

export const GeoMap = ({ data, height = 400 }: GeoMapProps) => {
  // Create a map of state codes to values
  const stateValues = data.reduce(
    (acc, point) => {
      acc[point.state] = point.value;
      return acc;
    },
    {} as Record<string, number>
  );

  const maxValue = Math.max(...data.map((d) => d.value));

  // Calculate color intensity based on value
  const getStateFill = (geoId: string) => {
    const value = stateValues[geoId];
    if (!value) return '#f9fafb'; // Very light gray for states with no data

    const intensity = value / maxValue;

    // Use graduated shades of compass green
    if (intensity > 0.75) return '#355E3B'; // Darkest
    if (intensity > 0.5) return '#60966e';
    if (intensity > 0.25) return '#a4c2ac';
    return '#c6d8cb'; // Lightest
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1000,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoId = geo.id;
              const value = stateValues[geoId];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getStateFill(geoId)}
                  stroke="#ffffff"
                  strokeWidth={1}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#2d4f32', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                >
                  {value && (
                    <title>
                      {geo.properties.name}: {formatValue(value)}
                    </title>
                  )}
                </Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};
