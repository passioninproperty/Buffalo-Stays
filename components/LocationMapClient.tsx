"use client";

import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMapClientProps {
  lat: number;
  lng: number;
}

export default function LocationMapClient({ lat, lng }: LocationMapClientProps) {
  const center: [number, number] = [lat, lng];

  return (
    <div className="w-full h-96 rounded-3xl overflow-hidden shadow-lg border border-brand-border relative z-10">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={center}
          radius={500}
          pathOptions={{
            color: '#1D2A3A',
            fillColor: '#1D2A3A',
            fillOpacity: 0.15,
            weight: 1.5,
            dashArray: '5, 5'
          }}
        />
      </MapContainer>
    </div>
  );
}
