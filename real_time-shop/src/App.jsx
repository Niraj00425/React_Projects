import React, { useEffect, useMemo, useState } from "react";
import { seedProducts } from "./data/products";
import { formatINR, load, save } from "./utils/format";
import useRealtime from "./hooks/useRealtime";
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";

export default function App() {
  const [products, setProducts] = useState(() => load("rt:products", seedProducts));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [cart, setCart] = useState(() => load("rt:cart", {})); // {id: qty}
  const [banner, setBanner] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [coupon, setCoupon] = useState("");

  // persist
  useEffect(() => save("rt:products", products), [products]);
  useEffect(() => save("rt:cart", cart), [cart]);

  // realtime simulation
  useRealtime(products, setProducts, setBanner);

  // derived
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter(p => (category === "All" || p.category === category) && (q === "" || p.title.toLowerCase().includes(q)));
    switch (sortBy) {
      case "price_low": list.sort((a,b) => a.price - b.price); break;
      case "price_high": list.sort((a,b) => b.price - a.price); break;
      case "rating": list.sort((a,b) => b.rating - a.rating); break;
      default: list.sort((a,b) => b.stock - a.stock);
    }
    return list;
  }, [products, query, category, sortBy]);

  const cartItems = useMemo(() => Object.entries(cart).map(([id, qty]) => ({ ...products.find(p => p.id === id), qty })).filter(Boolean), [cart, products]);
  const subtotal = useMemo(() => cartItems.reduce((s, it) => s + it.price * it.qty, 0), [cartItems]);
  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.toUpperCase() === "WELCOME10") return Math.round(subtotal * 0.10);
    if (coupon.toUpperCase() === "FREESHIP") return subtotal >= 999 ? 99 : 0;
    return 0;
  }, [coupon, subtotal]);
  const total = Math.max(0, subtotal - discount);

  const addToCart = (id) => {
    const p = products.find(x => x.id === id);
    if (!p || p.stock <= 0) return;
    setCart(prev => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, p.stock) }));
  };
  const decFromCart = (id) => setCart(prev => {
    const next = { ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) };
    if (next[id] === 0) delete next[id];
    return next;
  });

  const onCheckout = () => {
    alert(`Thank you! Order placed for ${cartItems.length} items totaling ${formatINR(total)}.`);
    setCart({});
    setCoupon("");
    setShowCart(false);
  };

  return (
    <>
      <NavBar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
        cartCount={cartItems.reduce((s, it) => s + it.qty, 0)}
        onOpenCart={() => setShowCart(true)}
      />

      {banner && (
        <div className="py-2 text-center small bg-light border-bottom">
          <span className="badge badge-live me-2">LIVE</span>
          <span className="text-muted">{new Date(banner.ts).toLocaleTimeString()} · {banner.msg}</span>
        </div>
      )}

      <main className="container my-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onAdd={addToCart} />
          ))}
        </div>
      </main>

      <CartPanel
        open={showCart}
        items={cartItems}
        subtotal={subtotal}
        coupon={coupon}
        setCoupon={setCoupon}
        discount={discount}
        total={total}
        inc={addToCart}
        dec={decFromCart}
        onClose={() => setShowCart(false)}
        onCheckout={onCheckout}
      />
    </>
  );
}
