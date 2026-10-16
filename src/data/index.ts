import { properties } from './properties';
import { projects } from './projects';
import { areas } from './areas';
import { agents } from './agents';
import { services } from './services';
import { Property, Project, Area, Agent, Service } from '../types';

export { properties, projects, areas, agents, services };

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getAreaByName(name: string): Area | undefined {
  return areas.find((a) => a.name.en === name || a.id.includes(name.toLowerCase()));
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getExclusiveProperties(): Property[] {
  return properties.filter((p) => p.exclusive);
}

export function getPropertiesByArea(areaName: string): Property[] {
  return properties.filter((p) => p.location.area.toLowerCase().includes(areaName.toLowerCase()) || areaName.toLowerCase().includes(p.location.area.toLowerCase()));
}

export function getPropertiesByListingType(type: 'buy' | 'rent'): Property[] {
  return properties.filter((p) => p.listingType === type);
}
