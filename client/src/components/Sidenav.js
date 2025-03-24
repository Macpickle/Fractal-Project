import { useEffect, useState } from 'react';
function SideNav({catalog, handleFilter}) {
    const [showPriceSlider, setShowPriceSlider] = useState(false);
    const maxPrice = Math.max(...catalog.map(item => item.price));
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(maxPrice);

    useEffect(() => {
        setPriceMin(0);
        setPriceMax(maxPrice);
    }, [maxPrice]);
    
    return (
        <nav className="sidenav mt-3" style={{width: '250px'}}>
            <h5 className="text-center">Filter</h5>

            <div className="col-md-12 col-sm-8 mb-2">
                <button className="custom-dropdown text-left" onClick={() => setShowPriceSlider(!showPriceSlider)}>
                    Price
                </button>
                {showPriceSlider && (
                    <div className="mt-3">
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            step="1000"
                            value={priceMin}
                            className="form-range"
                            onChange={(e) => setPriceMin(Number(e.target.value))}
                        />
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            step="1000"
                            value={priceMax}
                            className="form-range"
                            onChange={(e) => setPriceMax(Number(e.target.value))}
                        />
                        <p>Min: ${priceMin}</p>
                        <p>Max: ${priceMax}</p>

                        <button className="btn btn-secondary w-full w-100" onClick={() => handleFilter("price", [priceMin, priceMax])}>
                            Apply
                        </button>
                    </div>
                )}
            </div>

            <div className="col-md-12 col-sm-8 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("make", e.target.value)}>
                    <option value="" default>Make</option>
                    {[...new Set(catalog.map(item => item.make))].map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-12 col-sm-8 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("model", e.target.value)}>
                    <option value="" default>Model</option>
                    {[...new Set(catalog.map(item => item.model))].map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-12 col-sm-8 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("type", e.target.value)}>
                    <option value="" default>Vehicle Type</option>
                    {[...new Set(catalog.map(item => item.carType))].map((carType, index) => (
                        <option key={index} value={carType}>{carType}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-12 col-sm-8 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("color", e.target.value)}>
                    <option value="" default>Color</option>
                        {[...new Set(catalog.map(item => item.color))].map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                </select>
            </div>
        </nav>
    );
}

export default SideNav;