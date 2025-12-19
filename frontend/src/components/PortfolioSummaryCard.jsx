import { useMemo } from "react";
import { formatCurrency, formatPercent } from "../utils";
import Card from "./general/Card";
import Title from "./general/Title";

const PortfolioSummaryCard = ({
  totalValue,
  totalChange,
  totalChangePercent,
  isLoading,
  error,
}) => {
  const isPositive = useMemo(() => totalChange >= 0, [totalChange]);

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-500">{error.message}</div>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Total Portfolio Value</Title>
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(totalValue)}
        </p>
      </div>
      <div className="inline-flex items-center py-1.5 rounded-md">
        <span
          className={`text-md font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          } mr-2`}
        >
          {isPositive ? "↑" : "↓"} {formatCurrency(Math.abs(totalChange))}
        </span>
        <span
          className={`text-md font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          ({formatPercent(totalChangePercent)})
        </span>
      </div>
    </Card>
  );
};

export default PortfolioSummaryCard;
