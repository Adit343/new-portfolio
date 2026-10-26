'use client';

import { useEffect, useState } from 'react';
import { VisualEditing } from 'next-sanity/visual-editing';

/** Mounts visual editing only inside the Studio's Presentation iframe, never on the standalone site. */
export function StudioOverlay() {
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  return inIframe ? <VisualEditing /> : null;
}
