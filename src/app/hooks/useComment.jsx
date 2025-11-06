// src/app/hooks/useComment.jsx
"use client";

import { useState, useEffect } from "react";
import { getCommentsAction } from "../_actions/commentActions";

export function useCommentById(haikuId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!haikuId) return;

    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await getCommentsAction(haikuId);
      if (mounted) {
        setComments(data || []);
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [haikuId]);

  return { comments, setComments, loading };
}
