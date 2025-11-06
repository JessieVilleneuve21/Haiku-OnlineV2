// src/app/hooks/useHaiku.jsx
"use client";

import { useEffect, useState } from "react";
import { getHaikuByIdAction, getAllHaikuAction } from "../_actions/haikuActions";

export function useHaikuById(id) {
  const [haiku, setHaiku] = useState(null);
  const [hloading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const data = await getHaikuByIdAction(id);
      setHaiku(data);
      setLoading(false);
    })();
  }, [id]);

  return { haiku, hloading };
}

export function useAllHaikus() {
  const [haikus, setHaikus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const data = await getAllHaikuAction();
      if (mounted) {
        setHaikus(data);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { haikus, loading };
}

