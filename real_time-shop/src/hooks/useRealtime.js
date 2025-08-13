import { useEffect } from "react";
import { formatINR } from "../utils/format";

/**
 * Simulate real-time stock/price updates.
 * Calls setBanner({msg, ts}) with human readable messages.
 */
export default function useRealtime(products, setProducts, setBanner) {
  useEffect(() => {
    const t = setInterval(() => {
      setProducts((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const stockEvent = Math.random() < 0.65;
        const delta = stockEvent ? (Math.random() < 0.5 ? -1 : 1) * Math.ceil(Math.random() * 2) : 0;
        const priceBump = !stockEvent ? (Math.random() < 0.5 ? -1 : 1) * 50 : 0;
        const next = prev.map((it, i) => i !== idx ? it : ({
          ...it,
          stock: Math.max(0, it.stock + delta),
          price: Math.max(99, it.price + priceBump),
        }));
        const changed = next[idx];
        const msg = stockEvent
          ? `${changed.title}: ${delta > 0 ? "restocked" : "stock dropping"} (now ${changed.stock})`
          : `${changed.title}: price ${priceBump > 0 ? "↑" : "↓"} to ${formatINR(changed.price)}`;
        setBanner({ msg, ts: Date.now() });
        return next;
      });
    }, 4500);
    return () => clearInterval(t);
  }, [setProducts, setBanner, products.length]);
}
