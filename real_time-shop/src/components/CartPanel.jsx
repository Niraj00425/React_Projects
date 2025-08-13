import React from "react";
import { formatINR } from "../utils/format";

export default function CartPanel({ open, items, subtotal, coupon, setCoupon, discount, total, inc, dec, onClose, onCheckout }) {
  return (
    <div className={`offcanvas-like ${open ? "open" : ""}`}>
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <h5 className="mb-0">Your Cart</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
      </div>
      <div className="p-3 flex-grow-1 overflow-auto">
        {items.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          items.map((it) => (
            <div key={it.id} className="d-flex align-items-center mb-3">
              <img src={it.img} alt={it.title} className="rounded me-2" width="56" height="56" style={{objectFit:"cover"}} />
              <div className="flex-grow-1">
                <div className="fw-semibold">{it.title}</div>
                <div className="small text-muted">{formatINR(it.price)} × {it.qty}</div>
              </div>
              <div className="btn-group" role="group">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => dec(it.id)}>-</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => inc(it.id)}>+</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-3 border-top">
        <div className="input-group mb-2">
          <input className="form-control" placeholder="Coupon (WELCOME10 / FREESHIP)" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <span className="input-group-text">Apply</span>
        </div>
        <div className="d-flex justify-content-between small"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
        <div className="d-flex justify-content-between small"><span>Discount</span><span>-{formatINR(discount)}</span></div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between fw-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
        <button className="btn btn-primary w-100 mt-3" disabled={items.length===0} onClick={onCheckout}>Checkout</button>
      </div>
    </div>
  );
}
