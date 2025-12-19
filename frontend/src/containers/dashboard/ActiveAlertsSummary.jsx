import { useMemo } from "react";
import Card from "../../components/general/Card";
import Title from "../../components/general/Title";
import { formatTimestamp } from "../../utils/index";

const getSeverityColor = (severity) => {
  const colors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
  };
  return colors[severity?.toLowerCase()] || "bg-gray-100 text-gray-800";
};

// Consider moving to components section, keeping here for simplicity.
const AlertItem = ({ alert }) => {
  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(
                alert.severity
              )}`}
            >
              {alert.severity?.toUpperCase() || "UNKNOWN"}
            </span>
            <span className="text-xs text-gray-500">
              {formatTimestamp(alert.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-900">{alert.message}</p>
        </div>
      </div>
    </div>
  );
};

const ActiveAlertsSummary = ({ dashboardData, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <div className="text-gray-600">Loading alerts...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-600">Error loading alerts: {error}</div>
      </Card>
    );
  }

  const activeAlerts = useMemo(
    () => (dashboardData.activeAlerts || []).slice(0, 5),
    [dashboardData.activeAlerts]
  );

  return (
    <Card>
      <Title>Active Alerts</Title>
      {activeAlerts.length === 0 ? (
        <div className="text-gray-500 text-sm">No active alerts</div>
      ) : (
        <div>
          {activeAlerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default ActiveAlertsSummary;
