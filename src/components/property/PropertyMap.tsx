import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  ExternalLink, 
  X, 
  Key, 
  Layers,
  MapPin,
  ChevronRight,
  Info,
  Compass
} from 'lucide-react';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useCurrencyStore } from '../../store/currencyStore';
import { localizeAreaName, localizePropertyType } from '../../utils/localize';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property;
  center?: [number, number];
  zoom?: number;
  className?: string;
  showNearby?: boolean;
}

interface ClusterItem {
  id: string;
  lat: number;
  lng: number;
  properties: Property[];
  isSingle: boolean;
  hasSelected: boolean;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  center = [25.378, 51.552],
  zoom = 13,
  className = 'h-[460px] sm:h-[520px]',
  showNearby = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const mapboxMapRef = useRef<mapboxgl.Map | null>(null);
  const leafletMarkersRef = useRef<L.Marker[]>([]);
  const mapboxMarkersRef = useRef<mapboxgl.Marker[]>([]);

  const { currency } = useCurrencyStore();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const isRtl = lang === 'ar';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePreviewProperty, setActivePreviewProperty] = useState<Property | null>(null);
  const [isMobileInteractive, setIsMobileInteractive] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(zoom);

  // Read environment variable for Mapbox Token
  const envToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim() || '';
  const [customToken, setCustomToken] = useState(envToken);
  const effectiveToken = customToken.trim();
  const hasValidMapboxToken = Boolean(effectiveToken && effectiveToken.startsWith('pk.'));

  // Default coordinates: selected property or fallback
  const mapCenter: [number, number] = useMemo(() => {
    if (selectedProperty?.location?.lat && selectedProperty?.location?.lng) {
      return [selectedProperty.location.lat, selectedProperty.location.lng];
    }
    return center;
  }, [selectedProperty, center]);

  // Filter valid properties with real coordinates
  const validProperties = useMemo(() => {
    const list = properties.filter(
      (p) => typeof p?.location?.lat === 'number' && typeof p?.location?.lng === 'number'
    );
    // Ensure selected property is always present
    if (selectedProperty && !list.some((p) => p.id === selectedProperty.id)) {
      list.unshift(selectedProperty);
    }
    return list;
  }, [properties, selectedProperty]);

  // Clustering and Collision Prevention logic
  const clusteredItems = useMemo<ClusterItem[]>(() => {
    if (validProperties.length === 0) return [];

    // If zoomed in close (zoom >= 14) or single property, render individual markers with micro-offset
    if (currentZoom >= 14 || validProperties.length <= 1) {
      // Check for exact coordinate overlaps and apply subtle deterministic offset
      const coordMap = new Map<string, number>();
      return validProperties.map((prop) => {
        const key = `${prop.location.lat.toFixed(4)}_${prop.location.lng.toFixed(4)}`;
        const count = coordMap.get(key) || 0;
        coordMap.set(key, count + 1);

        let lat = prop.location.lat;
        let lng = prop.location.lng;

        // If another pin shares the exact same location, spread radially by ~35 meters
        if (count > 0 && (!selectedProperty || prop.id !== selectedProperty.id)) {
          const angle = count * (Math.PI / 3);
          const radius = 0.00035;
          lat += radius * Math.sin(angle);
          lng += (radius * Math.cos(angle)) / Math.cos((lat * Math.PI) / 180);
        }

        return {
          id: prop.id,
          lat,
          lng,
          properties: [prop],
          isSingle: true,
          hasSelected: Boolean(selectedProperty && prop.id === selectedProperty.id),
        };
      });
    }

    // Zoom < 14: Cluster nearby properties within ~0.007 degrees
    const clusters: ClusterItem[] = [];
    const threshold = 0.007; // ~700 meters

    validProperties.forEach((prop) => {
      // Don't cluster the selected property if possible so it remains highlighted
      if (selectedProperty && prop.id === selectedProperty.id) {
        clusters.push({
          id: prop.id,
          lat: prop.location.lat,
          lng: prop.location.lng,
          properties: [prop],
          isSingle: true,
          hasSelected: true,
        });
        return;
      }

      // Check if matches an existing cluster
      const existing = clusters.find((c) => {
        if (c.hasSelected) return false; // Keep selected property isolated
        const dLat = Math.abs(c.lat - prop.location.lat);
        const dLng = Math.abs(c.lng - prop.location.lng);
        return dLat < threshold && dLng < threshold;
      });

      if (existing) {
        existing.properties.push(prop);
        existing.isSingle = false;
        // Average coordinates
        existing.lat = (existing.lat + prop.location.lat) / 2;
        existing.lng = (existing.lng + prop.location.lng) / 2;
      } else {
        clusters.push({
          id: prop.id,
          lat: prop.location.lat,
          lng: prop.location.lng,
          properties: [prop],
          isSingle: true,
          hasSelected: false,
        });
      }
    });

    return clusters;
  }, [validProperties, currentZoom, selectedProperty]);

  // Recenter map to the selected property or initial center
  const handleRecenter = useCallback(() => {
    if (hasValidMapboxToken && mapboxMapRef.current) {
      mapboxMapRef.current.flyTo({
        center: [mapCenter[1], mapCenter[0]],
        zoom: selectedProperty ? 15 : zoom,
        speed: 1.2,
        curve: 1.4,
      });
    } else if (leafletMapRef.current) {
      leafletMapRef.current.flyTo(
        mapCenter,
        selectedProperty ? 15 : zoom,
        { duration: 1.2 }
      );
    }
  }, [hasValidMapboxToken, mapCenter, selectedProperty, zoom]);

  // Zoom controls
  const handleZoomIn = () => {
    if (hasValidMapboxToken && mapboxMapRef.current) {
      mapboxMapRef.current.zoomIn({ duration: 300 });
    } else if (leafletMapRef.current) {
      leafletMapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (hasValidMapboxToken && mapboxMapRef.current) {
      mapboxMapRef.current.zoomOut({ duration: 300 });
    } else if (leafletMapRef.current) {
      leafletMapRef.current.zoomOut();
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize();
      }
      if (mapboxMapRef.current) {
        mapboxMapRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    if (mapContainerRef.current) observer.observe(mapContainerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Initialize Mapbox GL JS if valid token is provided
  useEffect(() => {
    if (!hasValidMapboxToken) return;
    if (!mapContainerRef.current) return;

    // Destroy existing Leaflet map if present
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    try {
      mapboxgl.accessToken = effectiveToken;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [mapCenter[1], mapCenter[0]],
        zoom: selectedProperty ? 15 : zoom,
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false,
      });

      map.on('zoom', () => {
        setCurrentZoom(Math.round(map.getZoom()));
      });

      mapboxMapRef.current = map;

      return () => {
        map.remove();
        mapboxMapRef.current = null;
      };
    } catch (err) {
      console.warn('Mapbox initialization failed, falling back to Luxury Tile Layer:', err);
    }
  }, [hasValidMapboxToken, effectiveToken]);

  // Initialize Leaflet Map (when no Mapbox token or as resilient real tile layer)
  useEffect(() => {
    if (hasValidMapboxToken) return;
    if (!mapContainerRef.current) return;

    // Destroy existing Mapbox instance if present
    if (mapboxMapRef.current) {
      mapboxMapRef.current.remove();
      mapboxMapRef.current = null;
    }

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: mapCenter,
        zoom: selectedProperty ? 15 : zoom,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false, // Prevent wheel trapping while scrolling
      });

      // Primary: CartoDB Voyager luxury light tiles
      const primaryTileLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd',
        }
      );

      // Resilient fallback tile layer on error
      primaryTileLayer.on('tileerror', () => {
        console.info('Switching to secondary tile provider...');
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);
      });

      primaryTileLayer.addTo(map);

      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      leafletMapRef.current = map;
    }

    return () => {
      // cleanup on unmount
    };
  }, [hasValidMapboxToken, mapCenter, selectedProperty, zoom]);

  // Render Leaflet Markers
  useEffect(() => {
    if (hasValidMapboxToken || !leafletMapRef.current) return;
    const map = leafletMapRef.current;

    // Clear existing markers
    leafletMarkersRef.current.forEach((m) => m.remove());
    leafletMarkersRef.current = [];

    clusteredItems.forEach((item) => {
      if (item.isSingle && item.properties[0]) {
        const prop = item.properties[0];
        const isSelected = item.hasSelected;
        const formattedPrice = formatPrice(prop.price, currency, lang);

        const iconHtml = isSelected
          ? `
            <div class="relative flex items-center justify-center cursor-pointer select-none" style="z-index: 1000;">
              <div class="absolute w-12 h-12 rounded-full luxury-halo-pulse pointer-events-none"></div>
              <div style="
                background: linear-gradient(135deg, #111715 0%, #18201D 100%);
                border: 2px solid #B49A70;
                color: #FFFFFF;
                border-radius: 6px;
                padding: 5px 12px;
                display: flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(180, 154, 112, 0.35);
                font-family: inherit;
                transform: translate(-50%, -100%);
                white-space: nowrap;
              ">
                <span style="color: #B49A70; font-size: 13px;">★</span>
                <div>
                  <div style="font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #B49A70; font-weight: 700;">
                    ${isRtl ? 'المسكن المختار' : 'FEATURED RESIDENCE'}
                  </div>
                  <div style="font-size: 13px; font-weight: 700; color: #FFFFFF; font-family: serif;">
                    ${formattedPrice}
                  </div>
                </div>
              </div>
            </div>
          `
          : `
            <div class="cursor-pointer select-none" style="
              background: #111715;
              color: #B49A70;
              border: 1px solid rgba(180, 154, 112, 0.6);
              border-radius: 4px;
              padding: 4px 9px;
              font-size: 11px;
              font-weight: 700;
              white-space: nowrap;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
              display: flex;
              align-items: center;
              gap: 4px;
              font-family: inherit;
              transform: translate(-50%, -50%);
              transition: all 0.2s ease;
            ">
              <span>${formattedPrice}</span>
            </div>
          `;

        const icon = L.divIcon({
          className: 'luxury-property-marker-wrapper',
          html: iconHtml,
          iconSize: isSelected ? [140, 50] : [85, 26],
          iconAnchor: isSelected ? [70, 50] : [42, 13],
        });

        const marker = L.marker([item.lat, item.lng], {
          icon,
          zIndexOffset: isSelected ? 1000 : 100,
        }).addTo(map);

        marker.on('click', () => {
          setActivePreviewProperty(prop);
          map.panTo([item.lat, item.lng], { animate: true, duration: 0.8 });
        });

        leafletMarkersRef.current.push(marker);
      } else {
        // Cluster Marker
        const count = item.properties.length;
        const iconHtml = `
          <div class="cursor-pointer select-none" style="
            background: #111715;
            color: #FFFFFF;
            border: 2px solid #B49A70;
            border-radius: 9999px;
            padding: 6px 14px;
            font-size: 12px;
            font-weight: 700;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
            transform: translate(-50%, -50%);
          ">
            <span style="color: #B49A70;">◆</span>
            <span>${count} ${isRtl ? 'مساكن' : 'Residences'}</span>
          </div>
        `;

        const icon = L.divIcon({
          className: 'luxury-cluster-marker',
          html: iconHtml,
          iconSize: [110, 36],
          iconAnchor: [55, 18],
        });

        const marker = L.marker([item.lat, item.lng], { icon }).addTo(map);

        marker.on('click', () => {
          map.setView([item.lat, item.lng], currentZoom + 2, { animate: true });
        });

        leafletMarkersRef.current.push(marker);
      }
    });
  }, [clusteredItems, hasValidMapboxToken, currency, lang, isRtl, currentZoom]);

  // Render Mapbox Markers
  useEffect(() => {
    if (!hasValidMapboxToken || !mapboxMapRef.current) return;
    const map = mapboxMapRef.current;

    mapboxMarkersRef.current.forEach((m) => m.remove());
    mapboxMarkersRef.current = [];

    clusteredItems.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'luxury-mapbox-marker-node';

      if (item.isSingle && item.properties[0]) {
        const prop = item.properties[0];
        const isSelected = item.hasSelected;
        const formattedPrice = formatPrice(prop.price, currency, lang);

        el.innerHTML = isSelected
          ? `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
              <div class="luxury-halo-pulse" style="position: absolute; width: 44px; height: 44px; border-radius: 50%;"></div>
              <div style="background: #111715; border: 2px solid #B49A70; border-radius: 6px; padding: 4px 10px; color: #FFF; font-weight: 700; font-size: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); white-space: nowrap;">
                <span style="color: #B49A70;">★</span> ${formattedPrice}
              </div>
            </div>
          `
          : `
            <div style="background: #111715; color: #B49A70; border: 1px solid rgba(180,154,112,0.6); border-radius: 4px; padding: 3px 8px; font-size: 11px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.3); cursor: pointer; white-space: nowrap;">
              ${formattedPrice}
            </div>
          `;

        el.addEventListener('click', () => {
          setActivePreviewProperty(prop);
          map.flyTo({ center: [item.lng, item.lat], zoom: 15, speed: 1.2 });
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([item.lng, item.lat])
          .addTo(map);

        mapboxMarkersRef.current.push(marker);
      } else {
        const count = item.properties.length;
        el.innerHTML = `
          <div style="background: #111715; color: #FFF; border: 2px solid #B49A70; border-radius: 9999px; padding: 5px 12px; font-size: 11px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 18px rgba(0,0,0,0.4); white-space: nowrap;">
            <span style="color: #B49A70;">◆</span> ${count} ${isRtl ? 'مساكن' : 'Residences'}
          </div>
        `;

        el.addEventListener('click', () => {
          map.flyTo({ center: [item.lng, item.lat], zoom: map.getZoom() + 2, speed: 1.2 });
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([item.lng, item.lat])
          .addTo(map);

        mapboxMarkersRef.current.push(marker);
      }
    });
  }, [clusteredItems, hasValidMapboxToken, currency, lang, isRtl]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full rounded-sm overflow-hidden border border-[#E8E6E0] bg-[#F8F7F4] shadow-md select-none ${className} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''
      }`}
      dir="ltr"
    >
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Header Badge */}
      <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-[400] pointer-events-auto`}>
        <div className="flex items-center gap-2 bg-[#111715]/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#222B26] text-white shadow-lg text-xs">
          <MapPin className="w-3.5 h-3.5 text-[#B49A70]" />
          <span className="font-serif tracking-wide text-[11px] font-medium text-white/95">
            {selectedProperty
              ? `${selectedProperty.location.address || selectedProperty.location.area}`
              : (isRtl ? 'المواقع العقارية المختارة' : 'Curated Enclaves')}
          </span>
          <span className="text-[10px] text-[#B49A70] uppercase font-mono tracking-wider ml-1">
            {hasValidMapboxToken ? 'Mapbox GL 3D' : 'Luxury Light Engine'}
          </span>
        </div>
      </div>

      {/* Luxury Map Controls Bar (Top Right) */}
      <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-[400] flex flex-col gap-1.5 pointer-events-auto`}>
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-xl bg-[#10212B]/90 hover:bg-[#174B65] text-white border border-[#1E3A4B] flex items-center justify-center transition-all shadow-md active:scale-95 text-[#B69A70]"
          title={isRtl ? 'تكبير' : 'Zoom In'}
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-xl bg-[#10212B]/90 hover:bg-[#174B65] text-white border border-[#1E3A4B] flex items-center justify-center transition-all shadow-md active:scale-95 text-[#B69A70]"
          title={isRtl ? 'تصغير' : 'Zoom Out'}
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={handleRecenter}
          className="w-8 h-8 rounded-xl bg-[#10212B]/90 hover:bg-[#174B65] text-white border border-[#1E3A4B] flex items-center justify-center transition-all shadow-md active:scale-95"
          title={isRtl ? 'إعادة التمركز' : 'Recenter Location'}
          aria-label="Recenter"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#B69A70]" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="w-8 h-8 rounded-xl bg-[#10212B]/90 hover:bg-[#174B65] text-white border border-[#1E3A4B] flex items-center justify-center transition-all shadow-md active:scale-95"
          title={isFullscreen ? (isRtl ? 'خروج من وضع ملء الشاشة' : 'Exit Fullscreen') : (isRtl ? 'ملء الشاشة' : 'Fullscreen')}
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-[#B69A70]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#B69A70]" />}
        </button>

        <button
          onClick={() => setShowConfigModal(true)}
          className="w-8 h-8 rounded-xl bg-[#10212B]/90 hover:bg-[#174B65] text-[#B69A70] border border-[#B69A70]/40 flex items-center justify-center transition-all shadow-md active:scale-95"
          title={isRtl ? 'إعدادات مزود الخريطة' : 'Map Provider Settings'}
          aria-label="Provider settings"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mobile Gesture Interaction Hint */}
      {!isMobileInteractive && (
        <div className="sm:hidden absolute inset-0 z-[300] bg-black/10 flex items-center justify-center pointer-events-auto">
          <button
            onClick={() => setIsMobileInteractive(true)}
            className="px-4 py-2 bg-[#10212B]/90 backdrop-blur-md text-[#B69A70] border border-[#B69A70]/40 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-xl flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#B69A70] animate-spin-slow" />
            <span>{isRtl ? 'انقر للتفاعل مع الخريطة' : 'Tap to Explore Map'}</span>
          </button>
        </div>
      )}

      {/* Mobile Interactive Exit overlay button */}
      {isMobileInteractive && (
        <div className="sm:hidden absolute bottom-4 left-4 z-[400] pointer-events-auto">
          <button
            onClick={() => setIsMobileInteractive(false)}
            className="px-3 py-1 bg-[#10212B]/90 backdrop-blur-md text-white/80 border border-white/20 rounded-xl text-[10px] font-medium tracking-wide"
          >
            {isRtl ? 'إنهاء التفاعل' : 'Lock Scroll'}
          </button>
        </div>
      )}

      {/* Bottom Floating Luxury Property Preview Card */}
      {activePreviewProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[500] pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#10212B] text-[#F7F5F0] border border-[#B69A70]/40 rounded-2xl p-4 shadow-2xl relative" dir={isRtl ? 'rtl' : 'ltr'}>
            <button
              onClick={() => setActivePreviewProperty(null)}
              className={`absolute top-2.5 ${isRtl ? 'left-2.5' : 'right-2.5'} p-1 rounded-full text-white/60 hover:text-white bg-black/40 transition-colors`}
              aria-label="Close preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex gap-3 items-center">
              <img
                src={activePreviewProperty.images[0]}
                alt={activePreviewProperty.title[lang]}
                className="w-20 h-20 object-cover rounded-xl border border-[#1E3A4B] shrink-0"
              />

              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase tracking-wider text-[#B69A70] font-semibold block truncate">
                  {localizeAreaName(activePreviewProperty.location.area, lang)}
                </span>
                <h4 className="font-serif text-xs font-semibold text-white truncate mt-0.5">
                  {activePreviewProperty.title[lang]}
                </h4>
                <div className="text-sm font-semibold font-serif text-[#B69A70] mt-1">
                  {formatPrice(activePreviewProperty.price, currency, lang)}
                </div>
                <div className="text-[10px] text-white/60 mt-0.5">
                  {activePreviewProperty.bedrooms} {t('properties.beds')} • {activePreviewProperty.areaSqM} {t('properties.sqm')}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1E3A4B] flex items-center justify-between">
              <span className="text-[10px] text-white/50">
                {localizePropertyType(activePreviewProperty.propertyType, lang)}
              </span>
              <a
                href={`/properties/${activePreviewProperty.slug}`}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#B69A70] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>{isRtl ? 'عرض المسكن' : 'View Residence'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mapbox Token Configuration Modal */}
      {showConfigModal && (
        <div className="absolute inset-0 z-[600] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="bg-[#10212B] text-[#F7F5F0] border border-[#B69A70]/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowConfigModal(false)}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} text-white/60 hover:text-white`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[#B69A70]">
              <Layers className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium text-white">
                {isRtl ? 'إعدادات محرك الخرائط التفاعلية' : 'Map Engine Configuration'}
              </h3>
            </div>

            <p className="text-xs text-white/80 leading-relaxed font-light">
              {isRtl
                ? 'يدعم الموقع تلقائياً طبقة الخرائط الواقعية الفاخرة عالية الدقة. لتفعيل محرك Mapbox GL 3D التفاعلي، أضف مفتاح الوصول العام في ملف البيئة:'
                : 'THE ONE automatically provides real interactive high-resolution luxury cartography. To enable the optional Mapbox GL 3D vector engine, specify your public token:'}
            </p>

            <div className="bg-[#174B65]/30 p-3 rounded-xl border border-[#1E3A4B] font-mono text-xs text-[#B69A70]">
              VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                {isRtl ? 'اختبار مفتاح Mapbox مؤقتاً:' : 'Test Mapbox Public Token:'}
              </label>
              <input
                type="text"
                value={customToken}
                onChange={(e) => setCustomToken(e.target.value)}
                placeholder="pk.eyJ1..."
                className="w-full bg-[#174B65]/20 border border-[#1E3A4B] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#B69A70] outline-none font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-white/60 flex items-center gap-1">
                <Info className="w-3 h-3 text-[#B69A70]" />
                {hasValidMapboxToken
                  ? (isRtl ? 'محرك Mapbox GL 3D نشط' : 'Mapbox GL 3D Active')
                  : (isRtl ? 'طبقة الخرائط الواقعية الفاخرة نشطة' : 'Luxury Real Cartography Active')}
              </span>

              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-[#B69A70] text-[#10212B] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#D4C3A3] transition-colors"
              >
                {isRtl ? 'حفظ وإغلاق' : 'Apply & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
