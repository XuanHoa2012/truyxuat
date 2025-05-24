const CONTRACT_ADDRESS = "0xe762b6E85fb489683cA800Cc610Ae5Ca67d46C61";

const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "id", "type": "string" },
      { "internalType": "string", "name": "rawMaterial", "type": "string" },
      { "internalType": "string", "name": "manufacturer", "type": "string" },
      { "internalType": "string", "name": "packageInfo", "type": "string" },
      { "internalType": "string", "name": "distributor", "type": "string" }
    ],
    "name": "registerProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "id", "type": "string" }
    ],
    "name": "getProduct",
    "outputs": [
      { "internalType": "string", "name": "rawMaterial", "type": "string" },
      { "internalType": "string", "name": "manufacturer", "type": "string" },
      { "internalType": "string", "name": "packageInfo", "type": "string" },
      { "internalType": "string", "name": "distributor", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545"; // BNB Testnet RPC

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

async function truyXuat() {
  const id = document.getElementById("productId").value;
  try {
    const data = await contract.methods.getProduct(id).call();
    document.getElementById("ketQua").textContent = `
🔬 Nguyên liệu: ${data.rawMaterial}
🏭 Nhà sản xuất: ${data.manufacturer}
📦 Quy cách: ${data.packageInfo}
🚚 Phân phối: ${data.distributor}
    `;
  } catch (e) {
    document.getElementById("ketQua").textContent = "Không tìm thấy sản phẩm hoặc lỗi kết nối.";
  }
}

// Tự động truy xuất nếu có productId trong URL
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('productId');
  if (id) {
    document.getElementById("productId").value = id;
    truyXuat();
  }
};
