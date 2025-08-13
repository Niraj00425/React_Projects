import React from "react";

export default function NavBar({ query, setQuery, category, setCategory, categories, sortBy, setSortBy, cartCount, onOpenCart }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">Realtime <span className="text-primary">Shop</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <form className="d-flex ms-lg-3 my-3 my-lg-0 flex-grow-1" role="search">
            <input className="form-control me-2" type="search" placeholder="Search products" value={query} onChange={e => setQuery(e.target.value)} />
          </form>
          <div className="d-flex gap-2 ms-lg-3">
            <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => (<option key={c} value={c}>{c}</option>))}
            </select>
            <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="popularity">Popular</option>
              <option value="price_low">Price: Low → High</option>
              <option value="price_high">Price: High → Low</option>
              <option value="rating">Rating</option>
            </select>
            <button type="button" className="btn btn-primary position-relative" onClick={onOpenCart}>
              Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
