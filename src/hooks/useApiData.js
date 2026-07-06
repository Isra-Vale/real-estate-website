import { useEffect, useState, useRef } from "react";
import {
  getProperties,
  getProperty,
  getAgents,
  getTestimonials,
  getStats,
  getPosts,
  getPost,
  getRentals,
} from "../services/api";

/**
 * Generic loading wrapper around an async fetcher. The fetcher itself
 * (see services/api.js) already handles the API → mock-data fallback,
 * so by the time this hook resolves, `data` is always populated —
 * either with live API data or with mock data. `error` only gets set
 * if both the live call AND the mock fallback failed (e.g. truly
 * malformed mock data), which should not happen in normal use.
 */
function useAsyncData(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (mounted.current) setData(result);
      })
      .catch((err) => {
        if (mounted.current) setError(err);
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

export function useProperties() {
  return useAsyncData(getProperties, []);
}

export function useProperty(id) {
  return useAsyncData(() => getProperty(id), [id]);
}

export function useAgents() {
  return useAsyncData(getAgents, []);
}

export function useTestimonials() {
  return useAsyncData(getTestimonials, []);
}

export function useStats() {
  return useAsyncData(getStats, []);
}

export function usePosts() {
  return useAsyncData(getPosts, []);
}

export function usePost(id) {
  return useAsyncData(() => getPost(id), [id]);
}

export function useRentals() {
  return useAsyncData(getRentals, []);
}
