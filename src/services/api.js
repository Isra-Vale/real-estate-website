// ---------------------------------------------------------------------------
// API SERVICE LAYER
//
// Every getter below tries the real API first. If the request fails for any
// reason — network error, non-2xx response, timeout, malformed JSON, or no
// API_BASE_URL configured at all — it transparently falls back to the local
// mock data in `mockData.js` and the app keeps working with zero errors
// shown to the user.
//
// Configure your real API by setting VITE_API_BASE_URL in a `.env` file
// (copy `.env.example` to `.env` and fill it in). Until you do that, or
// whenever that API is down, every call below silently uses mock data.
// ---------------------------------------------------------------------------

import {
  properties as mockProperties,
  agents as mockAgents,
  testimonials as mockTestimonials,
  stats as mockStats,
  posts as mockPosts,
  rentals as mockRentals,
} from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const REQUEST_TIMEOUT_MS = 5000;

/**
 * True whenever the most recent fetch attempt fell back to mock data.
 * Pages can read this (via the hooks in useApiData.js) to show a small
 * "showing demo data" notice if they want to — none of the pages do by
 * default, since the fallback is meant to be invisible to the end user.
 */
export let isUsingMockData = false;

async function fetchWithFallback(path, mockValue) {
  if (!API_BASE_URL) {
    isUsingMockData = true;
    return mockValue;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`API responded with status ${res.status}`);

    const data = await res.json();
    isUsingMockData = false;
    return data;
  } catch (err) {
    // Covers network failure, timeout/abort, non-2xx, and bad JSON alike.
    console.warn(`[api] Falling back to mock data for "${path}":`, err.message);
    isUsingMockData = true;
    return mockValue;
  } finally {
    clearTimeout(timeout);
  }
}

export function getProperties() {
  return fetchWithFallback("/properties", mockProperties);
}

export async function getProperty(id) {
  if (!API_BASE_URL) {
    isUsingMockData = true;
    return mockProperties.find((p) => p.id === id) ?? null;
  }
  const list = await fetchWithFallback(`/properties/${id}`, null);
  if (list) return list;
  // API configured but this single-item endpoint failed — still try mock.
  return mockProperties.find((p) => p.id === id) ?? null;
}

export function getAgents() {
  return fetchWithFallback("/agents", mockAgents);
}

export function getTestimonials() {
  return fetchWithFallback("/testimonials", mockTestimonials);
}

export function getStats() {
  return fetchWithFallback("/stats", mockStats);
}

export function getPosts() {
  return fetchWithFallback("/posts", mockPosts);
}

export async function getPost(id) {
  if (!API_BASE_URL) {
    isUsingMockData = true;
    return mockPosts.find((p) => p.id === id) ?? null;
  }
  const result = await fetchWithFallback(`/posts/${id}`, null);
  if (result) return result;
  return mockPosts.find((p) => p.id === id) ?? null;
}

export function getRentals() {
  return fetchWithFallback("/rentals", mockRentals);
}
