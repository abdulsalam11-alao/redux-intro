import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
function MapStatetoProp(store) {
  return { balance: store.account.balance };
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default connect(MapStatetoProp)(BalanceDisplay);
