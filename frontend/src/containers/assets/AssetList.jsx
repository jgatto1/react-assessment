import { useState, useEffect, useMemo } from "react";
import { getStocks, getCrypto } from "../../services/api";
import { formatCurrency, formatPercent } from "../../utils/index";
import Card from "../../components/general/Card";

const FilterButton = ({ text, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white ${
        isActive ? "bg-blue-600" : "bg-blue-400"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Consdider using a filter object instead of a single state for the asset type in the future in case of more filters.
  const [assetType, setAssetType] = useState("all");

  // filter in memory
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      if (assetType === "all") return true;
      return asset.assetType === assetType;
    });
  }, [assets, assetType]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch stocks and crypto in parallel
        const [stocksResponse, cryptoResponse] = await Promise.all([
          getStocks(),
          getCrypto(),
        ]);

        // Combine both arrays
        const allAssets = [
          ...(stocksResponse.data.map((d) => ({ ...d, assetType: "stock" })) ||
            []),
          ...(cryptoResponse.data.map((d) => ({ ...d, assetType: "crypto" })) ||
            []),
        ];
        console.log(allAssets);

        setAssets(allAssets);
      } catch (err) {
        setError(err.message || "Failed to fetch assets");
        console.error("Error fetching assets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-gray-600">Loading assets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-600">Error loading assets: {error}</div>
      </div>
    );
  }

  if (filteredAssets.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-gray-500">No assets available</div>
      </div>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Listing</h2>
      <div className="flex items-center gap-4">
        <FilterButton
          text="All"
          isActive={assetType === "all"}
          onClick={() => setAssetType("all")}
        />
        <FilterButton
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
          text="Stocks"
          isActive={assetType === "stock"}
          onClick={() => setAssetType("stock")}
        />
        <FilterButton
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
          text="Crypto"
          isActive={assetType === "crypto"}
          onClick={() => setAssetType("crypto")}
        />
      </div>
      <div className="space-y-0">
        {filteredAssets.map((asset) => {
          const isPositive = asset.changePercent >= 0;
          const volumeFormatted = new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(asset.volume);

          return (
            <div
              key={asset.id || asset.symbol}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {asset.symbol}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {asset.name}
                </div>
              </div>
              <div className="flex items-center gap-6 ml-4">
                <div className="text-right min-w-[100px]">
                  <div className="font-medium text-gray-900">
                    {formatCurrency(asset.currentPrice)}
                  </div>
                </div>
                <div
                  className={`text-right font-semibold min-w-[80px] ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercent(asset.changePercent)}
                </div>
                <div className="text-right text-gray-600 min-w-[80px]">
                  <div className="text-sm">{volumeFormatted}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AssetList;
