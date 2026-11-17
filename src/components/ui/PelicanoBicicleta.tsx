import React from 'react';
import Image from 'next/image';

interface PelicanoBicicletaProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Componente de Pelícano en bicicleta animado en ultra alta calidad.
 * Utiliza el archivo SVG optimizado ubicado en /public/images/pelicano-bicicleta.svg
 */
export const PelicanoBicicleta: React.FC<PelicanoBicicletaProps> = ({
  className = '',
  width = 1000,
  height = 700,
  priority = false,
}) => {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <Image
        src="/images/pelicano-bicicleta.svg"
        alt="Pelícano en bicicleta animado ultra calidad"
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto object-contain"
        unoptimized // Necesario para preservar animaciones CSS internas del SVG
      />
    </div>
  );
};

export default PelicanoBicicleta;
