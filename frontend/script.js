// URL của API backend
const apiUrl = 'http://localhost:5000/api/products';

// Hàm để lấy danh sách sản phẩm từ API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Hàm để hiển thị sản phẩm lên giao diện
function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''; // Xóa dữ liệu cũ trước khi hiển thị

    if (products.length === 0) {
        productsList.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Quantity:</strong> ${product.quantity}</p>
            <p><strong>Description:</strong> ${product.description}</p>
        `;
        productsList.appendChild(productElement);
    });
}

// Gọi hàm fetchProducts khi trang tải
window.onload = fetchProducts;
// frontend/main.js
fetch('http://localhost:5000/products')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Hiển thị danh sách sản phẩm
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // frontend/main.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/products') // Gọi API từ backend
      .then(response => response.json())  // Chuyển đổi dữ liệu trả về thành JSON
      .then(data => {
        const productList = document.getElementById('product-list');
        // Hiển thị dữ liệu sản phẩm
        data.forEach(product => {
          const listItem = document.createElement('li');
          listItem.textContent = `${product.name} - ${product.price}`;
          productList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  });
  