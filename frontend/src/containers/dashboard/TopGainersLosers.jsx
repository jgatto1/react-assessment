import { useMemo } from "react";
import Card from "../../components/general/Card";
import Title from "../../components/general/Title";
import { formatCurrency, formatPercent } from "../../utils/index";

const AssetRow = ({ asset }) => {
  const isPositive = asset.changePercent >= 0;

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <div className="font-semibold text-gray-900">{asset.symbol}</div>
        <div className="text-sm text-gray-600">{asset.name}</div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="font-medium text-gray-900">
            {formatCurrency(asset.currentPrice)}
          </div>
        </div>
        <div
          className={`text-right font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatPercent(asset.changePercent)}
        </div>
      </div>
    </div>
  );
};

const TopGainersLosers = ({ dashboardData, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <div className="text-gray-600">Loading gainers and losers...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-600">Error loading data: {error}</div>
      </Card>
    );
  }

  if (!dashboardData) {
    return null;
  }

  // Get top 3 gainers and top 3 losers
  const topGainers = useMemo(
    () => dashboardData.topGainers?.slice(0, 3) || [],
    [dashboardData.topGainers]
  );
  const topLosers = useMemo(
    () => dashboardData.topLosers?.slice(0, 3) || [],
    [dashboardData.topLosers]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Top Gainers */}
      <Card>
        <Title>Top Gainers</Title>
        {topGainers.length === 0 ? (
          <div className="text-gray-500 text-sm">No gainers available</div>
        ) : (
          <div>
            {topGainers.map((asset) => (
              <AssetRow key={asset.id || asset.symbol} asset={asset} />
            ))}
          </div>
        )}
      </Card>

      {/* Top Losers */}
      <Card>
        <Title>Top Losers</Title>
        {topLosers.length === 0 ? (
          <div className="text-gray-500 text-sm">No losers available</div>
        ) : (
          <div>
            {topLosers.map((asset) => (
              <AssetRow key={asset.id || asset.symbol} asset={asset} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TopGainersLosers;
