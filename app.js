const CONTRACT_ADDRESS = "0xe762b6E85fb489683cA800Cc610Ae5Ca67d46C61";

const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "id",
        "type": "string"
      }
    ],
    "name": "ProductRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "rawMaterial",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "manufacturer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "packageInfo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "distributor",
        "type": "string"
      }
    ],
    "name": "registerProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      }
    ],
    "name": "getProduct",
    "outputs": [
      {
        "internalType": "string",
        "name": "rawMaterial",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "manufacturer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "packageInfo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "distributor",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function truyXuat() {
  if (!window.ethereum) {
    alert("Cần cài MetaMask để sử dụng.");
    return;
  }

  const web3 = new Web3(window.ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' });
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

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
    document.getElementById("ketQua").textContent = "Không tìm thấy sản phẩm.";
  }
}