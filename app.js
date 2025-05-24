const CONTRACT_ADDRESS = "0xe762b6E85fb489683cA800Cc610Ae5Ca67d46C61";

const ABI = [
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

async function truyXuat() {
  try {
    const web3 = new Web3("https://bsc-dataseed.binance.org/");
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    const id = document.getElementById("productId").value;

    const data = await contract.methods.getProduct(id).call();
    document.getElementById("ketQua").textContent = `
🧪 Nguyên liệu: ${data.rawMaterial}
🏭 Nhà sản xuất: ${data.manufacturer}
📦 Quy cách: ${data.packageInfo}
🚚 Phân phối: ${data.distributor}
    `;
  } catch (e) {
    document.getElementById("ketQua").textContent = "Không tìm thấy sản phẩm hoặc lỗi kết nối.";
  }
}
