import {useState, useEffect} from 'react';

// handler for filtering data
function FilterHandler({catalog, handleFilter}) {
    const [showPriceSlider, setShowPriceSlider] = useState(false);
    const maxPrice = Math.max(...catalog.map(item => item.price));
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(maxPrice);

    const resetSelection = () => {
        setPriceMin(0);
        setPriceMax(maxPrice);
        setShowPriceSlider(false);
        
        // change all selects to default value
        const selects = document.querySelectorAll('.custom-dropdown');
        selects.forEach(select => {
            select.value = '';
        });
    }

    useEffect(() => {
        setPriceMin(0);
        setPriceMax(maxPrice);
    }, [maxPrice]);

    return (
        <>
            <h5 className="text-center mt-5">Filter</h5>
            {/* price slider dropdown */}
            <div className="col-md-12 col-sm-12 mb-2">
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

            {/* dropdowns for all filters, set is used to only show unique values */}
            {/*https://getbootstrap.com/docs/4.0/components/forms/*/}
            <div className="col-md-12 col-sm-12 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("make", e.target.value)}>
                    <option value="" default>Make</option>
                    {[...new Set(catalog.map(item => item.make))].map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>

            {/*https://getbootstrap.com/docs/4.0/components/forms/*/}
            <div className="col-md-12 col-sm-12 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("model", e.target.value)}>
                    <option value="" default>Model</option>
                    {[...new Set(catalog.map(item => item.model))].map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>
            </div>

            {/*https://getbootstrap.com/docs/4.0/components/forms/*/}
            <div className="col-md-12 col-sm-12 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("type", e.target.value)}>
                    <option value="" default>Vehicle Type</option>
                    {[...new Set(catalog.map(item => item.carType))].map((carType, index) => (
                        <option key={index} value={carType}>{carType}</option>
                    ))}
                </select>
            </div>

            {/*https://getbootstrap.com/docs/4.0/components/forms/*/}
            <div className="col-md-12 col-sm-12 mb-2">
                <select className="custom-dropdown w-full" placeholder="Select an option" onChange={(e) => handleFilter("color", e.target.value)}>
                    <option value="" default>Color</option>
                        {[...new Set(catalog.map(item => item.color))].map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                </select>
            </div>

            {/*https://getbootstrap.com/docs/4.0/components/buttons/*/}
            <div className="col-md-12 col-sm-12 mb-2">
                <button className="btn btn-secondary w-full w-100" onClick={(e) => {
                    e.preventDefault();
                    handleFilter("reset", null);
                    resetSelection();
                }
                }>
                    Reset Filters
                </button>
            </div>
        </>
    );
}

export default FilterHandler;