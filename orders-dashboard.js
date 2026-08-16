const ORDERS_KEY = "isai-fashions-orders";

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayOrders();
    setupEventListeners();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('keyup', filterAndDisplayOrders);
    document.getElementById('statusFilter').addEventListener('change', filterAndDisplayOrders);
    document.getElementById('exportBtn').addEventListener('click', exportOrdersToCSV);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllOrders);
}

// Get all orders from localStorage
function getAllOrders() {
    try {
        const saved = localStorage.getItem(ORDERS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading orders:', error);
        return [];
    }
}

// Save orders to localStorage
function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    updateStats();
}

// Add a new order
function addOrder(orderData) {
    const orders = getAllOrders();
    const newOrder = {
        id: `ORD-${Date.now()}`,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    orders.push(newOrder);
    saveOrders(orders);
    loadAndDisplayOrders();
    return newOrder;
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrders(orders);
        loadAndDisplayOrders();
    }
}

// Delete a single order
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = getAllOrders().filter(o => o.id !== orderId);
        saveOrders(orders);
        loadAndDisplayOrders();
    }
}

// Clear all orders
function clearAllOrders() {
    if (confirm('Are you sure you want to delete ALL orders? This cannot be undone.')) {
        localStorage.removeItem(ORDERS_KEY);
        loadAndDisplayOrders();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    const orders = getAllOrders();
    const pending = orders.filter(o => o.status === 'pending').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('completedOrders').textContent = completed;
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
}

// Load and display all orders
function loadAndDisplayOrders() {
    const orders = getAllOrders();
    displayOrders(orders);
}

// Filter and display orders based on search and status
function filterAndDisplayOrders() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    let orders = getAllOrders();

    // Filter by status
    if (statusFilter) {
        orders = orders.filter(o => o.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
        orders = orders.filter(o => 
            o.id.toLowerCase().includes(searchTerm) ||
            o.name.toLowerCase().includes(searchTerm) ||
            o.phone.toLowerCase().includes(searchTerm) ||
            o.email?.toLowerCase().includes(searchTerm)
        );
    }

    // Sort by newest first
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    displayOrders(orders);
}

// Display orders
function displayOrders(orders) {
    const container = document.getElementById('ordersContainer');

    if (!orders || orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No Orders Found</h2>
                <p>Try adjusting your search filters.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => createOrderCard(order)).join('');

    // Add event listeners to action buttons
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            const order = orders.find(o => o.id === orderId);
            if (order) {
                copyOrderToClipboard(order);
            }
        });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            deleteOrder(orderId);
        });
    });

    document.querySelectorAll('.status-toggle').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = e.target.dataset.orderId;
            updateOrderStatus(orderId, e.target.value);
        });
    });
}

// Create HTML for a single order card
function createOrderCard(order) {
    const createdDate = new Date(order.createdAt);
    const formattedDate = createdDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formattedTime = createdDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const itemsHtml = order.items.map(item => `
        <div class="order-item">
            ${item.image ? `<div class="item-image"><img src="${item.image}" alt="${item.name}"></div>` : ''}
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">Size: ${item.size || 'N/A'} | Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.qty * item.price).toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');

    return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-id-section">
                    <h3>${order.id}</h3>
                    <div class="order-date">${formattedDate} at ${formattedTime}</div>
                </div>
                <select class="status-toggle" data-order-id="${order.id}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>

            <div class="order-body">
                <div class="order-section">
                    <h4>📦 Items</h4>
                    <div class="order-items">
                        ${itemsHtml}
                    </div>
                </div>

                <div class="order-section">
                    <h4>👤 Customer Details</h4>
                    <div class="customer-details">
                        <p><span class="detail-label">Name:</span> ${order.name}</p>
                        <p><span class="detail-label">Phone:</span> ${order.phone}</p>
                        <p><span class="detail-label">City:</span> ${order.city}</p>
                        <p><span class="detail-label">Pincode:</span> ${order.pincode}</p>
                        <p><span class="detail-label">Address:</span> ${order.address}</p>
                        ${order.notes ? `<p><span class="detail-label">Notes:</span> ${order.notes}</p>` : ''}
                    </div>
                </div>
            </div>

            <div class="order-pricing">
                <div>
                    <div class="pricing-row">
                        <span>Subtotal</span>
                        <span>₹${order.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="pricing-row">
                        <span>Shipping</span>
                        <span>₹${order.shipping.toLocaleString('en-IN')}</span>
                    </div>
                    ${order.codFee ? `
                    <div class="pricing-row">
                        <span>COD Fee</span>
                        <span>₹${order.codFee.toLocaleString('en-IN')}</span>
                    </div>
                    ` : ''}
                </div>
                <div style="text-align: right;">
                    <div class="pricing-row total">
                        <span>Total</span>
                        <span>₹${order.total.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>

            <div class="order-footer">
                <div class="payment-method">
                    <strong>Payment:</strong> ${order.paymentMethod}
                </div>
                <div class="order-actions">
                    <button class="btn-small btn-copy" data-order-id="${order.id}">📋 Copy Details</button>
                    <button class="btn-small btn-delete" data-order-id="${order.id}">🗑️ Delete</button>
                </div>
            </div>
        </div>
    `;
}

// Copy order details to clipboard
function copyOrderToClipboard(order) {
    const itemsText = order.items.map(item => 
        `${item.name} (${item.size || 'N/A'}) x${item.qty} - ₹${(item.qty * item.price).toLocaleString('en-IN')}`
    ).join('\n');

    const text = `
Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString('en-IN')}
Status: ${order.status.toUpperCase()}

CUSTOMER DETAILS:
Name: ${order.name}
Phone: ${order.phone}
City: ${order.city}
Pincode: ${order.pincode}
Address: ${order.address}
${order.notes ? `Notes: ${order.notes}` : ''}

ITEMS:
${itemsText}

PRICING:
Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}
Shipping: ₹${order.shipping.toLocaleString('en-IN')}
${order.codFee ? `COD Fee: ₹${order.codFee.toLocaleString('en-IN')}` : ''}
Total: ₹${order.total.toLocaleString('en-IN')}

Payment Method: ${order.paymentMethod}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
        alert('Order details copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// Export orders to CSV
function exportOrdersToCSV() {
    const orders = getAllOrders();
    
    if (orders.length === 0) {
        alert('No orders to export');
        return;
    }

    let csv = 'Order ID,Date,Status,Customer Name,Phone,City,Pincode,Address,Items,Subtotal,Shipping,COD Fee,Total,Payment Method,Notes\n';

    orders.forEach(order => {
        const itemsText = order.items.map(i => `${i.name} (${i.size || 'N/A'}) x${i.qty}`).join('; ');
        const date = new Date(order.createdAt).toLocaleString('en-IN');
        
        csv += `"${order.id}","${date}","${order.status}","${order.name}","${order.phone}","${order.city}","${order.pincode}","${order.address.replace(/"/g, '""')}","${itemsText}","${order.subtotal}","${order.shipping}","${order.codFee || 0}","${order.total}","${order.paymentMethod}","${(order.notes || '').replace(/"/g, '""')}"\n`;
    });

    // Download CSV file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isai-fashions-orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
