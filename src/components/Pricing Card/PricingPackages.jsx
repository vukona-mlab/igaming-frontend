import React from "react";
import "./PricingPackages.css"; // Custom CSS file

const packages = [
  { name: "Basic", price: "R499", colorClass: "basic-bg" },
  { name: "Standard", price: "R999", colorClass: "standard-bg" },
  { name: "Premium", price: "R1,499", colorClass: "premium-bg" },
  { name: "Ultimate", price: "R1,999", colorClass: "ultimate-bg" }
];

export default function PricingPackages() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {packages.map((pkg, index) => (
          <div key={index} className="col-md-3">
            <div className="card text-center shadow-sm position-relative">
              {/* Label (Package Name) */}
              <div className={`package-label ${pkg.colorClass}`}>
                {pkg.name}
              </div>

              <div className="card-body">
                <h2 className="card-title">{pkg.price}</h2>
                <ul className="list-unstyled">
                  <li>✔️ 20 days faster</li>
                  <li>✔️ Free logo</li>
                  <li>✔️ Free design</li>
                </ul>
                <button className="btn btn-dark mt-3 w-100">Message</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
