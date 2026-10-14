import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

interface WeatherIconProps {
  code: number;
  isDay?: number;
  size?: number;
}

export default function WeatherIcon({
  code,
  isDay = 1,
  size = 48,
}: WeatherIconProps) {
  const iconProps = {
    size,
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };

  if (code === 0) {
    return isDay ? (
      <Sun {...iconProps} />
    ) : (
      <Moon {...iconProps} />
    );
  }

  if (code === 1 || code === 2) {
    return isDay ? (
      <CloudSun {...iconProps} />
    ) : (
      <CloudMoon {...iconProps} />
    );
  }

  if (code === 3) {
    return <Cloud {...iconProps} />;
  }

  if (code === 45 || code === 48) {
    return <CloudFog {...iconProps} />;
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return <CloudDrizzle {...iconProps} />;
  }

  if (
    [61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    return <CloudRain {...iconProps} />;
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return <CloudSnow {...iconProps} />;
  }

  if ([95, 96, 97, 99].includes(code)) {
    return <CloudLightning {...iconProps} />;
  }

  return <CloudSun {...iconProps} />;
}
