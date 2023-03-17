// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; // 컴파일러 버전 명시

contract agricultureContract {

    uint8 numberOfProducts; // 총 제품의 수입니다.
    address contractOwner;

    struct Product {
        uint   number;
        string productName;
        string location;
        uint timestamp;
    }

    Product[] public products;

    constructor() {        
        contractOwner = msg.sender;
    }

    function addProduct (uint _initNumber, string calldata _productName, string calldata _location) public {
        products.push(Product(_initNumber, _productName, _location, block.timestamp));
        numberOfProducts++;
    }

    //제품 등록의 수를 리턴합니다.
    function getNumOfProducts() public view returns(uint8) {
        return numberOfProducts;
    }
    
    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getProduct(uint _index) public view returns (uint, string memory, string memory, uint) {
        return (products[_index].number, products[_index].productName, products[_index].location, products[_index].timestamp);
    }
}