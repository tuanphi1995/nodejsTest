document.addEventListener('DOMContentLoaded', function () {
    const productTable = document.querySelector('#product-table tbody');
    const productForm = document.querySelector('#product-form');

    // Load sản phẩm từ API
    async function loadProducts() {
        const response = await fetch('/api/products');
        const products = await response.json();

        productTable.innerHTML = ''; // Xóa nội dung cũ

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.ProductCode}</td>
                <td>${product.ProductName}</td>
                <td>${new Date(product.ProductDate).toLocaleDateString()}</td>
                <td>${product.ProductOriginPrice.toLocaleString()}</td>
                <td>${product.Quantity}</td>
                <td>${product.ProductStoreCode}</td>
                <td><button class="btn btn-danger" data-id="${product._id}">Delete</button></td>
            `;
            productTable.appendChild(row);
        });

        // Xử lý sự kiện xóa sản phẩm
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                await fetch(`/api/products/${id}`, { method: 'DELETE' });
                loadProducts(); // Tải lại danh sách sản phẩm
            });
        });
    }

    // Thêm sản phẩm mới
    productForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const productData = {
            ProductCode: document.getElementById('ProductCode').value,
            ProductName: document.getElementById('ProductName').value,
            ProductDate: document.getElementById('ProductDate').value,
            ProductOriginPrice: document.getElementById('ProductOriginPrice').value,
            Quantity: document.getElementById('Quantity').value,
            ProductStoreCode: document.getElementById('ProductStoreCode').value
        };

        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        productForm.reset();
        loadProducts(); // Tải lại danh sách sản phẩm
    });

    loadProducts(); // Tải danh sách sản phẩm khi trang được tải
});
