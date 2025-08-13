import React from "react";
import { formatINR } from "../utils/format";

export default function ProductCard({ p, onAdd }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={p.img} className="card-img-top" alt={p.title} />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{p.title}</h5>
            <span className="badge text-bg-light">{p.category}</span>
          </div>
          <div className="mb-1">
            <span className="fw-semibold">{formatINR(p.price)}</span>
            <span className="ms-2 text-warning">★ {p.rating}</span>
          </div>
          <div className="small text-muted mb-3">Stock: {p.stock}</div>
          <button
            className="btn btn-outline-primary mt-auto"
            onClick={() => onAdd(p.id)}
            disabled={p.stock <= 0}
          >
            {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
