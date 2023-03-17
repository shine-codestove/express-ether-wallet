$(document).ready(function () {
  $("#loading").hide();

  let web3 = new Web3(Web3.givenProvider);
  let myAccount;

  //메타마스크와 연결되면 ethereum 객체가 생성된다
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else if (typeof window.web3 !== "undefined") {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    throw new Error("No web3 instance injected, using local web3.");
  }
  if (web3) {
    web3.eth.getAccounts().then((accounts) => {
      console.log(accounts);
      myAccount = accounts[0];
    });
  }
  const productRegistryContractAddress =
    "0x1552900c0Dfa1A446e7C0337bb2B85bA85BED458";
  const contract = new web3.eth.Contract(
    productRegistryContractABI,
    productRegistryContractAddress
  );

  $("#register-tab").click(function () {
    showTable();
  });

  $("#btnRegisterProduct").click(registerProduct);

  $("#btnShowTable").click(showTable);

  $("#contractLink").text(productRegistryContractAddress);
  $("#contractLink").attr(
    "href",
    "https://sepolia.etherscan.io//address/" + productRegistryContractAddress
  );

  function showInfo(message) {
    $("#infoBox>p").html(message);
    $("#infoBox").show();
    $("#infoBox>header").click(function () {
      $("#infoBox").hide();
    });
  }

  function showError(errorMsg) {
    $("#errorBox>p").html("Error: " + errorMsg);
    $("#errorBox").show();
    $("#errorBox>header").click(function () {
      $("#errorBox").hide();
    });
  }

  async function showTable() {
    $("#myTable").html("<table class='table'></table>");

    contract.methods
      .getNumOfProducts()
      .call()
      .catch((error) => {
        if (error) return showError("Smart contract call failed: " + error);
      })
      .then((result) => {
        // showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
        console.log("length: " + result);

        for (let i = 0; i < result; i++) {
          contract.methods
            .getProduct(i)
            .call()
            .then(function (product) {
              console.log("product: ", product);

              let toString = product.toString();
              // console.log("product: " + toString);
              let strArray = toString.split(",");

              let timestamp = new Date(product[3] * 1000);
              console.log("timestamp: " + timestamp);
              console.log("timestamp: " + product[3] * 1000);

              $("#myTable table").append(
                "<tr><td>" +
                  product[0] +
                  "</td><td>" +
                  product[1] +
                  "</td><td>" +
                  product[2] +
                  "</td><td>" +
                  timestamp +
                  "</tr>"
              );
            }); // end of get
        } // end of for
      });    
  }

  async function registerProduct() {
    // if ($('#documentForUpload')[0].files.length == 0)
    // return showError("Please select a file to upload.");

    let account = myAccount;
    console.log("my account ", account);

    let howMany = $("#pronumber").val();
    console.log("howMany ", howMany);

    let productName = $("#proname").val();
    console.log("productName ", productName);

    let whereIs = $("#proloc").val();
    console.log("whereIs ", whereIs);

    $("#loading").show();
    contract.methods
      .addProduct(howMany, productName, whereIs)
      .send({ from: myAccount })
      .then((result) => {
        console.log(result);
        showInfo(
          `Document ${result} <b>successfully added</b> to the registry.`
        );
        $("#resultMessage").text(JSON.stringify(result));
      })
      .catch((error) => {
        showError("Smart contract call failed: " + error);
      })
      .finally(() => {
        $("#loading").hide();
      });
  }

  function verifyDocument() {
    if (typeof web3 === "undefined")
      return showError(
        "Please install MetaMask to access the Ethereum Web3 injected API from your Web browser."
      );

    let account = myAccount;
    console.log("my account ", account);
  }
});
const productRegistryContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_productName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
    ],
    name: "addProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "number",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct agricultureContract.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumOfProducts",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
